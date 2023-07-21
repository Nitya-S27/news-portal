import React from "react";
import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { PushSpinner } from "react-spinners-kit";
import { Button } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import "./NewsDetail.scss";

const NewsDetail = () => {
    const params = new URLSearchParams(useLocation().search);
    const objectID = params.get("id");
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        title: "No Title Found",
        points: 0,
        children: [],
    });
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            await axios
                .get(`https://hn.algolia.com/api/v1/items/${objectID}`)
                .then((result) => {
                    setLoading(false);
                    // console.log(result.data);
                    // setNewsDetail(result.data);
                    setData({
                        title: result.data.title
                            ? result.data.title
                            : "No title found",
                        points: result.data.points
                            ? result.data.points
                            : "No points found",
                        children: result.data.children,
                    });
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        };
        getData();
    }, [objectID]);

    return (
        <div className="wrapper">
            <Button
                variant="contained"
                className="backButton"
                onClick={() => history.push("/")}
            >
                <KeyboardBackspaceIcon />
            </Button>
            {loading ? (
                <div className="loaderWrapper">
                    <PushSpinner color="white" />
                </div>
            ) : (
                <div className="details">
                    <h1 className="newsTitle">{data.title}</h1>

                    <div className="detailBox">
                        <div className="headerDiv">
                            <h1 className="header">Comments</h1>
                            <h1 className="header">
                                News points : <i>{data.points}</i>
                            </h1>
                        </div>
                        <div className="comments">
                            <ul className="commentsList">
                                {data.children.map(
                                    (comment) =>
                                        comment.text && (
                                            <li
                                                key={comment.id}
                                                dangerouslySetInnerHTML={{
                                                    __html: comment.text,
                                                }}
                                            ></li>
                                        )
                                )}
                            </ul>
                            {!data.children.length && (
                                <div className="noComments">No Comments</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsDetail;
