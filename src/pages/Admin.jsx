import { useEffect, useState } from "react";
import API from "../api/api";
import "../App.css";

function Admin() {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    name: "",
    type: "",
    price: "",
    capacity: ""
  });

  // LOAD ROOMS
  const loadRooms = async () => {
    const res = await API.get("/rooms");
    setRooms(res.data);
  };

  useEffect(() => {
    loadRooms();
  }, []);

  // ADD ROOM
  const addRoom = async () => {
    if (!newRoom.name || !newRoom.type || !newRoom.price) {
      alert("Nhập đầy đủ thông tin");
      return;
    }

    await API.post("/rooms", {
      ...newRoom,
      price: Number(newRoom.price),
      capacity: Number(newRoom.capacity)
    });

    setNewRoom({ name: "", type: "", price: "", capacity: "" });
    loadRooms();
  };

  // DELETE ROOM
  const deleteRoom = async (id) => {
    if (!window.confirm("Xóa phòng này?")) return;
    await API.delete(`/rooms/${id}`);
    loadRooms();
  };

  // CHANGE STATUS
  const changeStatus = async (id, status) => {
    await API.put(`/rooms/${id}/status`, { status });
    loadRooms();
  };

  return (
    <div className="container">
      <h1>👨‍💼 ADMIN – Quản lý phòng</h1>

      {/* ADD ROOM */}
      <div className="box">
        <h2>➕ Thêm phòng</h2>

        <input
          placeholder="Tên phòng"
          value={newRoom.name}
          onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
        />

        <input
          placeholder="Loại phòng"
          value={newRoom.type}
          onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
        />

        <input
          placeholder="Giá"
          type="number"
          value={newRoom.price}
          onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
        />

        <input
          placeholder="Sức chứa"
          type="number"
          value={newRoom.capacity}
          onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
        />

        <button onClick={addRoom}>Thêm phòng</button>
      </div>

      {/* ROOMS TABLE */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Loại</th>
            <th>Giá</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td>{room.name}</td>
              <td>{room.type}</td>
              <td>{room.price}</td>
              <td>{room.status}</td>
              <td>
                <button
                  onClick={() =>
                    changeStatus(
                      room._id,
                      room.status === "available" ? "booked" : "available"
                    )
                  }
                >
                  Đổi trạng thái
                </button>

                <button
                  style={{ background: "red", marginLeft: 5 }}
                  onClick={() => deleteRoom(room._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
