import yfinance as yf
import pandas as pd
import json

data = pd.read_csv('/home/alroy/Work/stock_analysis/data.csv')

tickers = data['Symbol']

data = []

# iterate through the series and add each element to the data list
for val in tickers:
    data.append({'value': val, 'label': val})

# write the data to a JSON file
with open('data.json', 'w') as f:
    json.dump(data, f)