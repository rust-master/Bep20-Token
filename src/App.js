import React from "react";
import "./App.css";
import Web3 from "web3";
import contract from "./build/contracts/Bep20Token.json";

class App extends React.Component {
  async componentWillMount() {
    this.loadWeb3();
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.sendToken = this.sendToken.bind(this);
    this.state = {
      receiver: "",
      amount: 0,
      account: "",
    };
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  async sendToken() {
    const web3 = window.web3;
    const webeProvider = new Web3(Web3.givenProvider);
    const accounts = await webeProvider.eth.getAccounts();

    this.setState({ account: accounts[0] });
    console.log("Sender :  " + accounts[0]);

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = contract.networks[networkId];

    const instance = new web3.eth.Contract(
      contract.abi,
      deployedNetwork.address
    );

    await instance.methods
      .transfer(this.state.receiver, this.state.amount)
      .send({
        from: accounts[0],
      });

    const totalSupply = await instance.methods.totalSupply().call();
    console.log("Total Supply" + totalSupply);
  }

  render() {
    return (
      <div className="App">
        <input
          type="text"
          name="receiver"
          placeholder="Receiver"
          value={this.state.receiver}
          onChange={this.handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={this.state.amount}
          onChange={this.handleChange}
        />

        <button onClick={this.sendToken}>Send</button>
      </div>
    );
  }
}

export default App;
