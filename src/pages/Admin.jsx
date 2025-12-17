import { useEffect, useState } from "react";
import API from "../api/api";
import "../App.css";

function Admin() {
  const [rooms, setRooms] = useState([]);

  const loadRooms = async () => {
    const res = await API.get("/rooms");
    setRooms(res.data);
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const toggleStatus = async (room) => {
    const newStatus =
      room.status === "booked" ? "available" : "booked";

    await API.put(`/rooms/${room._id}/status`, {
      status: newStatus
    });

    loadRooms();
  };

  const deleteRoom = async (id) => {
    if (!window.confirm("Xóa phòng này?")) return;

    await API.delete(`/rooms/${id}`);
    loadRooms();
  };

  return (
    <div className="container">
      <h1>🔐 Admin – Quản lý phòng</h1>

      <div className="rooms">
        {rooms.map((room) => (
          <div key={room._id} className={`room ${room.status}`}>
            <h3>{room.name}</h3>
            <p>Giá: {room.price} VND</p>
            <p>
              Trạng thái: <b>{room.status}</b>
            </p>

            <button onClick={() => toggleStatus(room)}>
              {room.status === "booked"
                ? "Trả phòng"
                : "Đánh dấu đã đặt"}
            </button>

            <button
              style={{ background: "red", marginTop: 8 }}
              onClick={() => deleteRoom(room._id)}
            >
              Xóa phòng
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
