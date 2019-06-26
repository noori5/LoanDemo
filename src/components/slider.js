import React, { Component } from 'react';
import { Slider } from 'primereact/slider';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import axios from 'axios';
import '../index'
export default class LoanCalc extends Component {

    constructor() {
        super();
        this.state = {
            loanAmount: 500,
            loanDuration: 6,
            loanAmountErr: " ",
            errAmountInput: false,
            errDurationInput: false,
            loanDurationErr: "",
            monthlyPayment: null,
            interestRate: null,
            errOutput: ""
        };
        this.amountSlider = this.amountSlider.bind(this);
        this.durationSlider = this.durationSlider.bind(this);
        this.onSlideEnd = this.onSlideEnd.bind(this)
    }


    amountSlider(e) {
        var newValue;
        if (e.target && e.target.nodeName === "INPUT") {
            if (e.target.value < 500) {
                this.setState({ errAmountInput: true })
                this.setState({ loanAmountErr: "Loan amount should not be less than $500" })
                this.setState({ errOutput: "No Result..." })
            }
            else if (e.target.value > 5000) {
                this.setState({ errAmountInput: true })
                this.setState({ loanAmountErr: "Loan amount should not be greater than $5000" })
                this.setState({ errOutput: "No Result..." })
            }
            else {
                newValue = e.target.value;
                this.setState({ loanAmountErr: "", errAmountInput: false, errOutput: "" }, () => { this.update() })

            }
        }
        else {

            newValue = e.value;
            this.setState({ loanAmountErr: "", errAmountInput: false, errOutput: "" })
        }

        this.setState({ loanAmount: newValue });
    }
    update = () => {
        if (this.state.errAmountInput === true || this.state.errDurationInput === true) {
            this.setState({ errOutput: "No Result..." })
        }
        else {
            axios.get('https://ftl-frontend-test.herokuapp.com/interest?amount=' + this.state.loanAmount + '&numMonths=' + this.state.loanDuration).then(response => {
                var result = response.data
                if (result.status) {
                    if (result.status === "error") {
                        this.setState({ monthlyPayment: "Invalid", interestRate: "Invalid" })
                    }
                }
                else {
                    this.setState({ monthlyPayment: '$' + result.monthlyPayment.amount, interestRate: result.interestRate + '%' })
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
    componentDidMount() {
        this.update()
    }

    durationSlider(e) {
        var newValue;
        if (e.target && e.target.nodeName === "INPUT") {
            if (e.target.value < 6) {
                this.setState({ errDurationInput: true })
                this.setState({ loanDurationErr: "Loan duration should not be less than 6 months" })
                this.setState({ errOutput: "No Result..." })
            }
            else if (e.target.value > 24) {
                this.setState({ errDurationInput: true })
                this.setState({ loanDurationErr: "Loan duration should not be greater than 24 months" })
                this.setState({ errOutput: "No Result..." })
            }
            else {
                newValue = e.target.value;
                this.setState({ loanDurationErr: "", errDurationInput: false, errOutput: "" }, () => { this.update() })
            }
        }
        else {
            newValue = e.value;
            this.setState({ loanDurationErr: "", errDurationInput: false, errOutput: "" })

        }

        this.setState({ loanDuration: newValue });

    }

    onSlideEnd = () => {
        this.update()
    }

    render() {
        return (
            <div >
                <div id="calcform">
                    <h2 id="headerTitle" style={{ color: "#263238" }}>Loan Calculator</h2>
                    <div className="in">
                        <div className="row">
                            <label><h4 style={{ minWidth: "390px", fontSize: '1.5rem' }}>Loan Amount:{this.state.errAmountInput ? <span style={{ color: '#dc3545', fontWeight: '600' }}>Incorrect Value</span> : <span style={{ color: '#28a745', fontWeight: '600' }}>{'$' + this.state.loanAmount}</span>}</h4></label>
                            <div className="inputSlider">
                                <InputText value={this.state.loanAmount} style={{ width: '100%', textAlign: 'center' }} type="number" onChange={this.amountSlider} />
                                <Slider min={500} max={5000} value={this.state.loanAmount} onChange={this.amountSlider} onSlideEnd={this.onSlideEnd} style={{ width: '100%' }} />
                                <div className="sliderErr"><span className="text-danger">{this.state.loanAmountErr}</span></div>
                            </div>
                        </div>
                        <div className="row">
                            <label><h4 style={{ minWidth: "390px", fontSize: '1.5rem' }}>Loan Duration:{this.state.errDurationInput ? <span style={{ color: '#dc3545', fontWeight: '600' }}>Incorrect Value</span> : <span style={{ color: '#28a745', fontWeight: '600' }}>{this.state.loanDuration + ' months'}</span>}</h4></label>
                            <div className="inputSlider">
                                <InputText value={this.state.loanDuration} style={{ width: '100%', textAlign: 'center' }} type="number" onChange={this.durationSlider} />
                                <Slider min={6} max={24} value={this.state.loanDuration} onChange={this.durationSlider} onSlideEnd={this.onSlideEnd} style={{ width: '100%' }} />
                                <div className="sliderErr"><span className="text-danger">{this.state.loanDurationErr}</span></div>
                            </div>
                        </div>
                    </div>
                    <hr style={{ borderWidth: '2px', width: '80%' }} />
                    <div className="out">
                        {this.state.errOutput ? this.state.errOutput :
                            <div>
                                <h3>Monthly Payment: {this.state.monthlyPayment}</h3>
                                <h3>Interest Rate: {this.state.interestRate}</h3>
                            </div>
                        }

                    </div>

                </div>

            </div>
        );
    }
}