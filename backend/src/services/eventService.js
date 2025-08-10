import { pool } from "../config/database.js";

export async function fetchAllEvents(userId) {
  const query = `
    SELECT e.*, 
           CASE WHEN r.user_id IS NOT NULL THEN true ELSE false END as is_registered
    FROM events e
    LEFT JOIN registrations r 
      ON e.id = r.event_id 
      AND r.user_id = ? 
      AND r.status = 'registered'
    ORDER BY e.date ASC
  `;
  return pool.execute(query, [userId]);
}

export async function fetchEventById(userId, eventId) {
  const query = `
    SELECT e.*,
           CASE WHEN r.user_id IS NOT NULL THEN true ELSE false END as is_registered
    FROM events e
    LEFT JOIN registrations r 
      ON e.id = r.event_id 
      AND r.user_id = ? 
      AND r.status = 'registered'
    WHERE e.id = ?
  `;
  return pool.execute(query, [userId, eventId]);
}

export async function findEventById(eventId) {
  return pool.execute(
    "SELECT id, max_attendees, current_attendees FROM events WHERE id = ?",
    [eventId]
  );
}

export async function checkExistingRegistration(eventId, userId) {
  return pool.execute(
    'SELECT id FROM registrations WHERE event_id = ? AND user_id = ? AND status = "registered"',
    [eventId, userId]
  );
}

export async function checkAnyRegistration(eventId, userId) {
  return pool.execute(
    "SELECT id, status FROM registrations WHERE event_id = ? AND user_id = ?",
    [eventId, userId]
  );
}

export async function registerUserForEvent(connection, eventId, userId) {
  const [existingRegs] = await connection.execute(
    "SELECT id, status FROM registrations WHERE event_id = ? AND user_id = ?",
    [eventId, userId]
  );

  if (existingRegs.length > 0) {
    const currentStatus = existingRegs[0].status;
    await connection.execute(
      'UPDATE registrations SET status = "registered" WHERE event_id = ? AND user_id = ?',
      [eventId, userId]
    );

    if (currentStatus === "cancelled") {
      await connection.execute(
        "UPDATE events SET current_attendees = current_attendees + 1 WHERE id = ?",
        [eventId]
      );
    }
  } else {
    await connection.execute(
      'INSERT INTO registrations (user_id, event_id, status) VALUES (?, ?, "registered")',
      [userId, eventId]
    );

    await connection.execute(
      "UPDATE events SET current_attendees = current_attendees + 1 WHERE id = ?",
      [eventId]
    );
  }
}

export async function cancelUserRegistration(connection, eventId, userId) {
  await connection.execute(
    'UPDATE registrations SET status = "cancelled" WHERE event_id = ? AND user_id = ?',
    [eventId, userId]
  );
  await connection.execute(
    "UPDATE events SET current_attendees = current_attendees - 1 WHERE id = ?",
    [eventId]
  );
}
