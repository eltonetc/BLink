import React, { useState } from "react";
import "./TelaChat.css";
import {
  Search,
  MessageCirclePlus,
  Menu,
  Phone,
  MoreVertical,
  Plus,
  Image,
} from "lucide-react";

const TelaChat = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [dbConnected, setDbConnected] = useState(false); // false = aguardando BD

  // Aguardando conexão - sem contactos estáticos
  const contacts = [];
  
  const messages = [];

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1 className="logo">BLINK - Chats</h1>

        <div className="search-box">
          <Search size={14} />
          <input
            type="text"
            placeholder="Search for a chat"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={!dbConnected}
          />
          <MessageCirclePlus size={16} className="icon" />
          <Menu size={18} className="icon" />
        </div>

        <div className="contact-list">
          {!dbConnected ? (
            <div className="waiting-contacts">
              <p>Aguardando conexão com a base de dados...</p>
              <small>Os contactos aparecerão aqui</small>
            </div>
          ) : (
            contacts.map((contact, index) => (
              <div
                key={index}
                className={`contact-item ${selectedContact === contact.name ? "active" : ""}`}
                onClick={() => setSelectedContact(contact.name)}
              >
                <div className="avatar">
                  <span>{contact.name.charAt(0)}</span>
                </div>
                <div className="contact-info">
                  <h4>{contact.name}</h4>
                  <p>{contact.role}</p>
                </div>
                {contact.unread && (
                  <span className="notification">{contact.unread}</span>
                )}
              </div>
            ))
          )}
        </div>

        <div className="sidebar-footer">
          <div className="footer-avatar">
            <span>U</span>
          </div>
          <div className="footer-icons">
            <Phone size={16} />
            <Image size={16} />
          </div>
        </div>
      </aside>

      {/* Main Chat */}
      <main className="chat-main">
        <header className="chat-header">
          <div className="chat-user">
            <div className="avatar small">
              <span>{selectedContact ? selectedContact.charAt(0) : "?"}</span>
            </div>
            <span>{selectedContact || "Nenhum contacto"}</span>
          </div>

          <div className="chat-actions">
            <button className="call-btn" disabled={!dbConnected}>
              Call <Phone size={12} />
            </button>
            <Search size={16} />
            <MoreVertical size={16} />
          </div>
        </header>

        <section className="chat-body">
          {!dbConnected ? (
            <div className="waiting-messages">
              <p>Aguardando conexão com a base de dados...</p>
              <small>As mensagens aparecerão aqui</small>
            </div>
          ) : messages.length === 0 ? (
            <div className="no-messages">
              <p>Nenhuma mensagem ainda</p>
              <small>Inicie uma conversa</small>
            </div>
          ) : (
            messages.map((msg, idx) => {
              const showDate = idx === 0 || messages[idx - 1].date !== msg.date;
              return (
                <React.Fragment key={idx}>
                  {showDate && <div className="date-divider">{msg.date}</div>}
                  <div className={`message ${msg.sender === "user" ? "outgoing" : "incoming"}`}>
                    <div className="message-bubble">
                      <div className="message-text">{msg.text}</div>
                      <div className="message-time">{msg.time}</div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })
          )}
        </section>

        <footer className="chat-footer">
          <input
            type="text"
            placeholder="Type Something"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={!dbConnected}
          />
          <div className="footer-actions">
            <Plus size={18} />
          </div>
        </footer>
      </main>
    </div>
  );
};

export default TelaChat;