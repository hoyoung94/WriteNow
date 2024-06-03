import pathlib

from gensim.models import Word2Vec
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor, VotingRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import train_test_split, RandomizedSearchCV
from joblib import load as joblib_load


def linear_regression(X, y, random_state=None):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=random_state)

    model = LinearRegression()
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    return model, mse, r2


def random_forest_regressor(X, y, random_state=None):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=random_state)
    model = RandomForestRegressor(n_estimators=100, random_state=random_state)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    return model, mse, r2


def tune_ensemble_model(X, y, random_state=None, n_iter=10):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=random_state)

    # 앙상블 모델 구성
    rf_model = RandomForestRegressor(random_state=random_state)
    gb_model = GradientBoostingRegressor(random_state=random_state)
    ensemble_model = VotingRegressor(estimators=[('rf', rf_model), ('gb', gb_model)])

    # 하이퍼파라미터 튜닝
    params = {
        'rf__n_estimators': [100, 200, 300],
        'rf__max_depth': [None, 5, 10],
        'gb__n_estimators': [100, 200, 300],
        'gb__max_depth': [3, 5, 7],
        'gb__learning_rate': [0.01, 0.1, 0.3]
    }
    random_search = RandomizedSearchCV(ensemble_model, param_distributions=params, n_iter=n_iter, cv=5,
                                       scoring='neg_mean_squared_error', random_state=random_state)
    random_search.fit(X_train, y_train)

    # 최적 모델 선택
    best_model = random_search.best_estimator_
    y_pred = best_model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    return best_model, mse, r2


def get_book_score_model():
    return joblib_load(pathlib.Path(__file__).parent.resolve() / 'ml_model' / 'book_score_model.joblib')


def get_book_title_word2vec_model():
    return Word2Vec.load(str(pathlib.Path(__file__).parent.resolve() / 'ml_model' / 'book_title_word2vec.model'), mmap='r')
