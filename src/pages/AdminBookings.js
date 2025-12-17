import { useEffect, useState } from "react";
import API from "../api/api";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      alert("Không load được booking");
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const cancelBooking = async (id) => {
    if (!window.confirm("Hủy đặt phòng này?")) return;

    try {
      await API.delete(`/bookings/${id}`);
      alert("Đã hủy booking");
      loadBookings();
    } catch (err) {
      alert("Hủy thất bại");
    }
  };

  return (
    <div>
      <h1>📊 Quản lý đặt phòng (Admin)</h1>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Khách hàng</th>
            <th>Phòng</th>
            <th>Loại</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td>{b.customerName}</td>
              <td>{b.room?.name}</td>
              <td>{b.room?.type}</td>
              <td>{b.checkIn}</td>
              <td>{b.checkOut}</td>
              <td>
                <button
                  style={{ background: "red" }}
                  onClick={() => cancelBooking(b._id)}
                >
                  Hủy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminBookings;
