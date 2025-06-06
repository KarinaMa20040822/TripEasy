import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Car,
  Hotel,
  Ticket,
  Download,
  Plus,
  MessageCircle,
  Globe,
  Clock,
} from "lucide-react";

const TravelGuideApp = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "您好！我是您的AI旅遊導遊助手 🌍 我可以幫您規劃完美的旅程，從路線規劃到預訂服務，一站式為您解決。請告訴我您的旅遊計劃吧！",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [activeTab, setActiveTab] = useState("chat");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // 模擬AI回應
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    let response = "";
    let tripData = null;

    if (input.includes("維也納") && input.includes("赫爾辛基")) {
      response = `太棒了！維也納到赫爾辛基的自駕之旅會是一次難忘的經歷！🚗

基於您的需求，我為您推薦以下路線：
📍 **建議路線**：維也納 → 布拉格 → 德勒斯登 → 柏林 → 漢堡 → 哥本哈根 → 斯德哥爾摩 → 赫爾辛基

🗓️ **10天行程安排**：
• 第1-2天：維也納出發，遊覽布拉格
• 第3-4天：德國德勒斯登、柏林
• 第5-6天：漢堡、丹麥哥本哈根
• 第7-8天：瑞典斯德哥爾摩
• 第9-10天：芬蘭赫爾辛基

預估總距離約1,800公里，是否需要我為您詳細規劃每一站的景點和住宿呢？`;

      tripData = {
        title: "維也納到赫爾辛基自駕遊",
        duration: "10天",
        distance: "1,800公里",
        cities: [
          "維也納",
          "布拉格",
          "德勒斯登",
          "柏林",
          "漢堡",
          "哥本哈根",
          "斯德哥爾摩",
          "赫爾辛基",
        ],
        estimatedCost: "$2,500",
        bestTime: "7月中旬",
      };
      setCurrentTrip(tripData);
    } else if (input.includes("預算") || input.includes("費用")) {
      response = `關於預算規劃，我來為您詳細分析：💰

**10天自駕遊預估費用**：
🚗 租車費用：$600-800 (含保險)
🏨 住宿費用：$1,200-1,800 (雙人房)
⛽ 燃油費用：$200-300
🍽️ 餐飲費用：$400-600
🎫 景點門票：$150-250
🛣️ 過路費/停車：$100-150

**總計約 $2,650-3,950**

您希望我為您尋找更經濟的選擇，還是推薦一些性價比高的住宿呢？`;
    } else if (input.includes("住宿") || input.includes("酒店")) {
      response = `我來為您推薦沿途的優質住宿選擇：🏨

**各城市推薦住宿**：
🇦🇹 **維也納**：Hotel Am Konzerthaus (市中心，€120/晚)
🇨🇿 **布拉格**：Hotel Golden Key (老城區，€90/晚)
🇩🇪 **柏林**：NH Collection Berlin Mitte (€110/晚)
🇩🇰 **哥本哈根**：Hotel Phoenix Copenhagen (€140/晚)
🇸🇪 **斯德哥爾摩**：Elite Hotel Stockholm Plaza (€130/晚)
🇫🇮 **赫爾辛基**：Hotel Kämp (€150/晚)

是否需要我為您一鍵預訂這些住宿呢？我可以比較不同平台的價格！`;
    } else {
      response = `我理解您的需求！讓我為您提供更多資訊。您可以告訴我：

🗺️ 想去的目的地
📅 出行時間和天數  
👥 同行人數
💰 預算範圍
🎯 特別想體驗的活動

這樣我就能為您量身定制最完美的旅遊計劃了！`;
    }

    return {
      id: Date.now(),
      type: "bot",
      content: response,
      timestamp: new Date(),
    };
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("zh-TW", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleQuickAction = (action) => {
    let message = "";
    switch (action) {
      case "booking":
        message = "我想要預訂住宿和租車服務";
        break;
      case "itinerary":
        message = "請為我生成詳細的旅遊手冊";
        break;
      case "calendar":
        message = "請幫我把行程加入Google行事曆";
        break;
      case "maps":
        message = "我需要下載離線地圖";
        break;
    }
    setInputMessage(message);
  };

  return (
    <div className="min-h-screen min-w-190vh bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="w-full px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                <Globe className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI旅遊導遊
                </h1>
                <p className="text-base text-gray-500">您的智能旅行規劃助手</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab("chat")}
                className={`px-6 py-3 rounded-lg font-medium transition-all text-lg ${
                  activeTab === "chat"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                💬 對話
              </button>
              <button
                onClick={() => setActiveTab("trip")}
                className={`px-6 py-3 rounded-lg font-medium transition-all text-lg ${
                  activeTab === "trip"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                🗺️ 行程
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full px-4 py-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Chat Section */}
          <div className="col-span-9">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
                <div className="flex items-center space-x-4">
                  <MessageCircle className="h-8 w-8" />
                  <h2 className="text-2xl font-semibold">智能旅遊助手</h2>
                  <div className="ml-auto flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-lg">在線</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-[600px] overflow-y-auto p-6 space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-2xl px-4 py-4 rounded-2xl ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-base leading-relaxed">
                        {message.content}
                      </div>
                      <div
                        className={`text-sm mt-3 ${
                          message.type === "user"
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl px-6 py-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-6">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="輸入您的旅遊需求..."
                    className="flex-1 border border-gray-300 rounded-full px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-4 gap-4">
              <button
                onClick={() => handleQuickAction("booking")}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all group"
              >
                <Hotel className="h-12 w-12 text-blue-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-lg font-medium text-gray-700">一鍵預訂</p>
              </button>
              <button
                onClick={() => handleQuickAction("itinerary")}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all group"
              >
                <Download className="h-12 w-12 text-green-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-lg font-medium text-gray-700">旅遊手冊</p>
              </button>
              <button
                onClick={() => handleQuickAction("calendar")}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all group"
              >
                <Calendar className="h-12 w-12 text-purple-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-lg font-medium text-gray-700">行事曆</p>
              </button>
              <button
                onClick={() => handleQuickAction("maps")}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all group"
              >
                <MapPin className="h-12 w-12 text-red-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-lg font-medium text-gray-700">離線地圖</p>
              </button>
            </div>
          </div>

          {/* Trip Info Sidebar */}
          <div className="col-span-3 space-y-8">
            {/* Current Trip */}
            {currentTrip && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <MapPin className="h-7 w-7 text-blue-500 mr-3" />
                  當前行程
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 text-xl">
                      {currentTrip.title}
                    </h4>
                    <div className="mt-4 space-y-3 text-base text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-3" />
                        {currentTrip.duration}
                      </div>
                      <div className="flex items-center">
                        <Car className="h-5 w-5 mr-3" />
                        {currentTrip.distance}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-3" />
                        {currentTrip.estimatedCost}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-700 mb-3 text-lg">
                      路線城市
                    </h5>
                    <div className="flex flex-wrap gap-3">
                      {currentTrip.cities.map((city, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm"
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Services */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                快速服務
              </h3>
              <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center space-x-3 text-lg">
                  <Car className="h-6 w-6" />
                  <span>租車服務</span>
                </button>
                <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center space-x-3 text-lg">
                  <Hotel className="h-6 w-6" />
                  <span>住宿預訂</span>
                </button>
                <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center space-x-3 text-lg">
                  <Ticket className="h-6 w-6" />
                  <span>景點門票</span>
                </button>
              </div>
            </div>

            {/* Weather Info */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                天氣資訊
              </h3>
              <div className="text-center">
                <div className="text-5xl mb-4">☀️</div>
                <p className="text-base text-gray-600">7月中旬歐洲天氣宜人</p>
                <p className="text-base text-gray-600">平均溫度：18-25°C</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelGuideApp;
