import { text } from "@fortawesome/fontawesome-svg-core";
import { Component, Fragment } from "react";
import "./Chatbot.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faPaperPlane,
  faFire,
  faHeart,
  faUserAstronaut,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: {
        text: "",
        answer: "",
      },
      input: "",
      open: "false",
      allChat: [],
    };

    this.questions = [
      "hello",
      "are you a robot",
      "how are you doing ",
      "i love you",
    ];
    this.answers = [
      "hi",
      "no I'm a human ",
      "I'm fine, thank you ",
      "i have a partner",
    ];
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value });
    // console.log(this.state.input);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { input, chat, allChat } = this.state;
    chat.text = input;
    for (let index = 0; index < this.questions.length; index++) {
      const singleQuestion = this.questions[index];
      if (singleQuestion.match(input)) {
        chat.answer = this.answers[index];
        break;
      } else chat.answer = "I'm sorry I don't understand";
    }

    allChat.push(chat);

    this.setState({
      input: "",
      chat: { answer: chat.answer },
      allChat: allChat,
    });
  };

  handleHeartclick = () => {};

  render() {
    let { chat, active, allChat } = this.state;

    return (
      <>
        <>
          <button
            onClick={() => {
              this.setState({ active: !active });
            }}
            id="star-btn"
          >
            <FontAwesomeIcon className="icones-star " icon={faStar} />
          </button>
          <div className={active ? "chat-container active" : "chat-container"}>
            <div className="chat-header">
              <div className="iconDiv">
                <FontAwesomeIcon className="icones " icon={faUserAstronaut} />
                <div className="greenCircle"></div>
              </div>
              <div className="id">
                <h5>Space Man</h5>
                <h5>Online</h5>
              </div>
            </div>
            <div className="chat-body">
              {allChat.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <p className="sentMessage">{item.text}</p>
                    <p className="receivedMessage">{item.answer}</p>
                  </Fragment>
                );
              })}
            </div>
            <div className="chat-footer">
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  placeholder="send a message"
                  onChange={this.handleChange}
                  value={this.state.input}
                />
                <button className="fireBtn">
                  <FontAwesomeIcon
                    className="icones-heart "
                    icon={faHeart}
                    onClick={this.handleHeartclick}
                  />
                </button>
                <button type="submit" className="sendBtn">
                  <FontAwesomeIcon
                    className="icones-send "
                    icon={faPaperPlane}
                  />
                </button>
              </form>
            </div>
          </div>
        </>
      </>
    );
  }
}

export default Chatbot;
