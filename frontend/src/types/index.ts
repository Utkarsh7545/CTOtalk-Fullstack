export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  created_at: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  speaker: string;
  speaker_bio: string;
  max_attendees: number;
  current_attendees: number;
  image_url?: string;
  created_at: string;
  is_registered?: boolean;
}

export interface Registration {
  id: number;
  user_id: number;
  event_id: number;
  registered_at: string;
  status: "registered" | "cancelled";
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}
