import React, { Component } from "react";
import styled from "styled-components";
import mixin from "../../styles/Mixin";
class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    componentDidMount() {
        this.timer = setInterval(
            () => this.getTimeUntil(this.props.deadline),
            1000,
        );
    }
    return;
    leading0(num) {
        return num < 10 ? "0" + num : num;
    }
    getTimeUntil(deadline) {
        const time = Date.parse(deadline) - Date.parse(new Date());
        if (time < 0) {
            this.setState({
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            });
            clearInterval(this.timer);
        } else {
            const seconds = Math.floor((time / 1000) % 60);
            const minutes = Math.floor((time / 1000 / 60) % 60);
            const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
            const days = Math.floor(time / (1000 * 60 * 60 * 24));
            this.setState({ days, hours, minutes, seconds });
        }
        return;
    }
    render() {
        return (
            <TimeBox>
                <span>D-{this.leading0(this.state.days)}일 </span>
                <span>
                    {this.leading0(this.state.hours)}:
                    {this.leading0(this.state.minutes)}:
                    {this.leading0(this.state.seconds)}
                </span>
            </TimeBox>
        );
    }
}

const TimeBox = styled.div`
    text-align: center;
    padding: 10px 0;
    span {
        font-size: 100px;
        ${mixin.textProps(null, "extraBold", "mainBlue")}
    }
`;
export default Clock;
