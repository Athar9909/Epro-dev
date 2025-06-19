import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Paperclip, Camera, Mic, Play, CheckCheck, Smile } from 'lucide-react';

const AppChatInterface = () => {
  const [message, setMessage] = useState('');

  const messages = [
    { id: 1, text: "Hello there!", time: "14:37", sender: "other" },
    { id: 2, text: "Hi, I'm looking for a desktop table. Do you have any available?", time: "14:38", sender: "user" },
    { id: 3, text: "Hello! Yes, we do.", time: "14:40", sender: "other", delivered: true },
    { id: 4, text: "Can you tell me more about your Webflow Templates?", time: "14:56", sender: "user" },
    { id: 5, text: "We can deliver within 2 days. Would you like to go ahead and confirm the order?", time: "14:58", sender: "other", delivered: true },
    { id: 6, text: "It comes in walnut brown, white oak.", time: "15:02", sender: "user" },
    { id: 7, text: "Nice. What's the price?", time: "15:03", sender: "other", delivered: true },
    { id: 8, type: "audio", duration: "0:37", time: "15:03", sender: "other", delivered: true }
  ];

  return (
    <div className="bg-[#f4f4f4] min-h-screen flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-[#e5e5e5]">
        <div className="flex items-center">
          <ChevronLeft className="w-6 h-6 text-[#272727] mr-3" />
          <div className="w-10 h-10 bg-[#FFF8E4] rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-semibold">AK</span>
          </div>
          <span className="text-lg font-medium text-[#272727]">Aamir Khan</span>
        </div>
        <button className="bg-[#009eb4] text-white px-4 py-2 rounded-lg font-medium">
          Assign
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-xs">
              {msg.type === 'audio' ? (
                <div className={`p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-[#009eb4] text-white' : 'bg-[#FFF8E4] text-[#272727]'}`}>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-[#F4C63B] bg-opacity-20 rounded-full flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-1">
                        {[...Array(20)].map((_, i) => (
                          <div key={i} className={`w-1 bg-[#F4C63B] rounded-full ${i < 8 ? 'h-3' : i < 12 ? 'h-2' : 'h-1'}`}></div>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs">{msg.duration}</span>
                  </div>
                </div>
              ) : (
                <div className={`p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-[#fff] text-[#272727]' : 'bg-[#FFF8E4] text-[#272727]'} relative`}>
                  <p className="text-sm">{msg.text}</p>
                  {
                    msg.sender == 'user' && <CheckCheck size={20} className='absolute bottom-2 right-2' />
                  }

                </div>
              )}
              <div className={`flex items-center mt-1 space-x-1 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span className="text-xs text-[#A8A8A8]">{msg.time}</span>
                {msg.delivered && msg.sender === 'other' && (
                  <div className="flex space-x-1">
                    <div className="w-3 h-1 bg-[#009eb4] rounded-full"></div>
                    <div className="w-3 h-1 bg-[#009eb4] rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-[#e5e5e5] bg-white">
        <div className="flex items-center space-x-3 ">
          <div className="flex-1 flex items-center bg-white rounded-full px-4 py-3 border border-[#e5e5e5]">
            <span className="text-[#A8A8A8] text-sm mr-2">
              <Smile />
            </span>
            <input
              type="text"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-transparent text-[#272727] placeholder-[#A8A8A8] outline-none text-sm"
            />
            <Paperclip className="w-5 h-5 text-[#A8A8A8] mr-3" />
            <Camera className="w-5 h-5 text-[#A8A8A8]" />
          </div>
          <button className="p-3 rounded-full bg-[#009eb4]">
            <Mic className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Bottom indicator */}
      {/* <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-[#272727] rounded-full"></div>
      </div> */}
    </div>
  );
};

export default AppChatInterface;