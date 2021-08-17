import React, { Component } from "react";

class Clock2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }
    componentWillMount() {
        this.getTimeUntil(this.props.deadline);
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
            <p>
                <p>
                    {console.log("멈춰!")}
                    {this.leading0(this.state.days)} 일
                    {this.leading0(this.state.hours)} 시간
                    {this.leading0(this.state.minutes)} 분
                    {this.leading0(this.state.seconds)} 초 남았다
                </p>
                <p>
                    {this.leading0(this.state.hours)} 시간{" "}
                    {this.leading0(this.state.minutes)} 분 남았
                </p>
            </p>
        );
    }
}
export default Clock2;
