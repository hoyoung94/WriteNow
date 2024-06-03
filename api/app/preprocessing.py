import numpy as np
from gensim.models import Word2Vec
from konlpy.tag import Okt
from sklearn.feature_extraction.text import CountVectorizer

okt = Okt()


def dropna(data):
    new_data = data.dropna(axis=1, how='all')
    new_data = new_data.dropna(axis=0, how='any')
    return new_data


def without_outlier_over_Q1_Q3(data, target):
    new_data = data.dropna(axis=0, how='any')
    Q1 = new_data[target].quantile(0.25)
    Q3 = new_data[target].quantile(0.75)
    IQR = Q3 - Q1
    new_data = new_data[~((new_data[target] < (Q1 - 1.5 * IQR)) | (new_data[target] > (Q3 + 1.5 * IQR)))]
    return new_data


def remove_stopwords(text):
    return " ".join(
        [
            lexeme[0]
            for lexeme in okt.pos(text, norm=True)
            if lexeme[1] in ("Noun", "Unknown", "Foreign", "Alpha")
        ]
    )


def remove_stopwords_from_df(data, feature):
    new_data = data[feature].apply(remove_stopwords)
    new_data = new_data.str.strip().replace('', np.nan)
    new_data = new_data.dropna(axis=0, how='any')

    return new_data


def str_vectorize(data, feature):
    vectorizer = CountVectorizer()
    new_data = vectorizer.fit_transform(data[feature].dropna(axis=0, how='any'))
    return new_data, vectorizer


def text_to_vector(text, model, vector_size):
    tokens = okt.morphs(text)
    text_vector = [model.wv[token] for token in tokens if token in model.wv]
    if text_vector:
        return sum(text_vector) / len(text_vector)
    else:
        return [0] * vector_size


def word2vec_vectorize(data, feature, model=None, vector_size=100):
    tokenized_texts = []
    for text in data[feature]:
        tokens = okt.morphs(text)
        tokenized_texts.append(tokens)

    # Word2Vec 모델 학습
    if model is None:
        model = Word2Vec(tokenized_texts, vector_size=vector_size, window=5, min_count=1, workers=4)

    new_data = data[feature].apply(lambda s: text_to_vector(s, model, vector_size))

    return new_data, model
