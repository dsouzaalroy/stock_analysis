import json
import math

import yfinance as yf
import pandas as pd
import numpy as np
from yahooquery import Ticker
from scipy.stats import norm
from extract_analyse.flaskr.commons.extensions import cache
from flask import (
    Blueprint, jsonify, request
)

bp = Blueprint('stock_data', __name__, url_prefix='/finance')


@bp.route('/optionsAnalysis', methods=('GET',))
# @cache.cached(timeout=240)
def get_options_chain():
    stock_name = request.args.get('name')  # 'MSFT'
    date = request.args.get('date')  # '2023-04-14'

    stock = yf.Ticker(stock_name)

    current_chain = stock.option_chain(date)
    # Convert the DataFrame to a JSON format
    calls = black_scholes(stock, current_chain.calls, date)
    puts = black_scholes(stock, current_chain.puts, date)

    response = jsonify({'calls': calls.to_dict(), 'puts': puts.to_dict()})
    return response


@bp.route('/getExpiry', methods=('GET',))
# @cache.cached(timeout=240)
def get_expiry_dates():
    stock_name = request.args.get('name')
    stock = yf.Ticker(stock_name)
    # stock_options = stock.options
    return jsonify(stock.options)


@bp.route('/getPrice', methods=('GET', ))
# @cache.cached(timeout=240)
def get_current_price():
    stock_name = request.args.get('name')
    stock = Ticker(stock_name)
    stock_info = stock.price.get(stock_name)
    current_price = stock_info['regularMarketPrice']
    currency = stock_info['currency']
    return jsonify({'price': current_price, 'currency': currency})


# @cache.memoize()
def black_scholes(stock: yf.Ticker, opt_chain: pd.DataFrame, expiration_date: str):
    current_price = stock.history(period='1d')['Close'][0]
    # TODO Uncomment the below line once its fixed on yfinance
    risk_free_ir = 0.05  #Ticker('IRX').price.get('IRX')['regularMarketPrice'] / 100
    time_to_expire = get_time_to_expiration(expiration_date)
    d1 = compute_d1(opt_chain, current_price, risk_free_ir, time_to_expire)
    d2 = compute_d2(d1, opt_chain, time_to_expire)

    opt_chain['callPrice'] = current_price * norm.cdf(d1) - opt_chain['strike'] * np.exp(
        -risk_free_ir * time_to_expire) * norm.cdf(d2)

    opt_chain.drop(columns=['volume', 'change', 'contractSize', 'currency', 'percentChange', 'inTheMoney',
                            'lastTradeDate', 'lastPrice'], axis=1, inplace=True)
    return opt_chain


def compute_d1(opt: pd.DataFrame, current_price: float, risk_free_ir: float, time_to_expire: float):
    strike_price = opt['strike']
    implied_volat = opt['impliedVolatility']

    d1 = (np.log(current_price / strike_price) + (risk_free_ir + 0.5 * implied_volat ** 2) * time_to_expire) / (
            implied_volat * np.sqrt(time_to_expire))

    return d1


def compute_d2(d1, opt: pd.DataFrame, time_to_expire: float):
    d2 = d1 - opt['impliedVolatility'] * np.sqrt(time_to_expire)
    return d2


def return_pd_from_options(stock: yf.Ticker):
    option_chain = stock.option_chain()
    calls = option_chain.calls
    puts = option_chain.puts
    return pd.concat([calls, puts], axis=0)


def get_time_to_expiration(expiration_date):
    diff = (np.datetime64(expiration_date) - np.datetime64('now')) / np.timedelta64(1, 'D') / 365
    return diff

# get_options_chain()
# get_all_tickers()
