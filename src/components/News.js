import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./News.scss";
const News = ({ news }) => {
    return (
        <div className="newsBox">
            <h2 className="newsTitle">{news.title}</h2>
            <span className="newsAuthor">
                Author : {news.author}, &nbsp;Date posted :{" "}
                {news.created_at.slice(0, 10)}
            </span>
            <br />
            <Link to={`/newsDetail?id=${news.objectID}`} className="buttonLink">
                <Button
                    variant="contained"
                    color="secondary"
                    className="knowMoreButton"
                >
                    Know more
                </Button>
            </Link>
        </div>
    );
};

export default News;
