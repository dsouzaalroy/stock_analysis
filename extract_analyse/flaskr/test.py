import yfinance as yf

all_stock_data = yf.download(tickers="all", period="5d")

all_stock_names = all_stock_data.index.get_level_values(0).unique()

print(all_stock_names)