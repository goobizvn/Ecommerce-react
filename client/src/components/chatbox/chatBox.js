import React, { Component } from 'react';
import { Widget,addResponseMessage } from 'react-chat-widget';
import { ApiClient } from "../../utils/ApiClient";
import 'react-chat-widget/lib/styles.css';

class ChatBoxComponent extends Component {
    componentDidMount() {
        addResponseMessage("Welcome to this chat!");
    }

    handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
        ApiClient.chat(newMessage).
        then(res => {
            if (res.data != null) {
                addResponseMessage(res.data);
            }
        }).catch(e=>{
            console.log(e)
            addResponseMessage(newMessage);
        })
    }

    render() {
        return (
            <div className="chatBox">
                <Widget 
                    handleNewUserMessage={this.handleNewUserMessage}
                    title="ChatBox"
                    subtitle="What I can help you?"
                />
            </div>
        );
    }
}

export default ChatBoxComponent;