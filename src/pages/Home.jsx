import { useEffect, useState } from "react";
import API from "../api/api";
import "../App.css";

function Home() {
  // ===== STATE =====
  const [rooms, setRooms] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);

  // ===== LOAD ROOMS =====
  const loadRooms = async () => {
    try {
      const res = await API.get("/rooms");
      setRooms(res.data);
    } catch (err) {
      alert("Không kết nối được backend");
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  // ===== BOOK ROOM =====
  const bookRoom = async () => {
    if (!customerName || !checkIn || !checkOut || !selectedRoom) {
      alert("Vui lòng nhập đủ thông tin");
      return;
    }

    if (selectedRoom.status !== "available") {
      alert("Phòng đã được đặt");
      return;
    }

    try {
      await API.post("/bookings", {
        customerName,
        roomId: selectedRoom._id,
        checkIn,
        checkOut
      });

      alert("Đặt phòng thành công");

      setCustomerName("");
      setCheckIn("");
      setCheckOut("");
      setSelectedRoom(null);

      loadRooms();
    } catch (err) {
      alert("Đặt phòng thất bại");
    }
  };

  // ===== UI =====
  return (
    <div className="layout">
      {/* HEADER */}
      <header className="header">
        <h1>🏨 Booking App</h1>
        <a href="/admin" className="admin-link">
          Admin
        </a>
      </header>

      {/* MAIN */}
      <main className="container">
        {/* ROOMS LIST */}
        <h1> Bai KT_DH52201450_Ca2</h1>
        <section>
          <h2>🛏️ Danh sách phòng</h2>

          <div className="rooms">
            {rooms.map((room) => (
              <div
                key={room._id}
                className={`room ${room.status}`}
                onClick={() =>
                  room.status === "available" &&
                  setSelectedRoom(room)
                }
              >
                <h3>{room.name}</h3>
                <p>Loại: {room.type}</p>
                <p>Giá: {room.price} VND</p>
                <p>
                  Trạng thái:{" "}
                  <b
                    style={{
                      color:
                        room.status === "booked"
                          ? "red"
                          : "green"
                    }}
                  >
                    {room.status}
                  </b>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* BOOKING FORM */}
        <section className="box">
          <h2>📋 Đặt phòng</h2>

          <input
            placeholder="Tên khách hàng"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />

          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />

          <button onClick={bookRoom}>Đặt phòng</button>

          {selectedRoom && (
            <p className="selected">
              Phòng đã chọn: <b>{selectedRoom.name}</b>
            </p>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        © 2025 Booking App – Student Project
      </footer>
    </div>
  );
}

export default Home;
