import React from 'react';
import './GigCard.scss';
import {Link} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const GigCard = ({gig}) => {
    
    const { isLoading, error, data } = useQuery({
        queryKey: [gig.userId],
        queryFn: () =>
          newRequest.get(`/users/${gig.userId}`).then((res) => {
            return res.data;
          }),
    });


    return (
        <Link className='link' to={`/gig/${gig._id}`}>
            <div className='gigCard'>
                <img src={gig.cover} alt="" />
                <div className="info">
                    {isLoading ? (
                        "Loading" 
                    ) : error ? (
                        "Something went wrong!"
                    ) : (
                        <div className="user">
                            <img src={data.img || "/img/noavatar.jpg"} alt="" />
                            <span>{data.username}</span>
                        </div>
                    )}
                    <p>{gig.desc}</p>
                    <div className="star">
                        <img src="./img/star.png" alt="" />
                        <span>
                            {!isNaN(gig.totalStars / gig.starNumber) && 
                              Math.round(gig.totalStars / gig.starNumber)}
                        </span>
                    </div>
                </div>
                {/* <hr /> */}
                <div className="detail">
                    <img src="./img/heart.png" alt="" />
                    <div className="price">
                        <span>STARTING AT</span>
                        <h2>
                            $ {gig.price}
                        </h2>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default GigCard