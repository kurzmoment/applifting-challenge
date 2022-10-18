import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateArticle from "./pages/CreateArticle";
import Header from "./components/Header";
import MyArticles from "./pages/MyArticles";
import ArticleDetail from "./pages/ArticleDetail";
import EditArticle from "./pages/EditArticle";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route
            index
            path="/"
            element={
              <div>
                <Header />
                <App />
              </div>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="create-article"
            element={
              <div>
                <Header />
                <CreateArticle />
              </div>
            }
          />
          <Route
            path="my-articles"
            element={
              <div>
                <Header />
                <MyArticles />
              </div>
            }
          />
          <Route
            path="/article-detail/:id"
            element={
              <div>
                <Header />
                <ArticleDetail />
              </div>
            }
          />
          <Route
            path="my-articles/edit-article/:id"
            element={
              <div>
                <Header />
                <EditArticle />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
