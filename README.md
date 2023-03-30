# 📚 Bibliophile
Bibliophile is a social app for avid readers. 
Readers can track their shelf and talk about what they read. Hook is that they can only post about the books that they've already read.
We use a Machine learning algorithm to recommend posts to users based on their reading activity.

## Tech Stack
Node.js <br/>
Firebase for authentication <br/>
Mongodb <br/>
ML - Python, Scikit, Numpy, Pandas <br/>

We are using MVC pattern to write the backend of the application.

## Book Recommendation system
Dataset: https://www.kaggle.com/datasets/mohitnirgulkar/book-recommendation-data

We used Scipy to preprocess the data and Scikit-Learn for creating the model.

Scikit-Learn's Nearest Neighbors model is build under collaborative filtering approach. Also we use the Scientific computing library for creating compressed sparse row matrix(csr matrix) from pivot table and is used for modelling with a brute algorithm and cosine as metric

## Deployment

Both server and ML model are deployed on Azure App service.
