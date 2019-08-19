import React from 'react';
import { Carousel } from 'antd';
import '../assets/less/carousel.less';

const Img = ()=>{
    return (
        <div className="img">
            <Carousel autoplay>
                <div>
                <img src={require("../assets/imgs/1.jpeg")} />
                </div>
                <div>
                <img src={require("../assets/imgs/2.jpeg")} />
                </div>
                <div>
                <img src={require("../assets/imgs/3.jpg")} />
                </div>
                <div>
                <img src={require("../assets/imgs/4.jpeg")} />
                </div>
            </Carousel>
        </div>
    )
}

export default Img