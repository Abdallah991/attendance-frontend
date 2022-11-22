export class Event {
  id: number;
  title: string;
  description: string;
  capacity: string;
  date: string;
  time: string;
  location: string;
  status: string;
  type: string;
  image: string;
  host: string;
  guest: string;
  createdAt: string;
  updatedAt: string;

  constructor(event: Event) {
    this.id = event.id;
    this.title = event.title;
    this.description = event.description;
    this.capacity = event.capacity;
    this.date = event.date;
    this.time = event.time;
    this.location = event.location;
    this.status = event.status;
    this.type = event.type;
    this.image = event.image;
    this.host = event.host;
    this.guest = event.guest;
    this.createdAt = event.createdAt;
    this.updatedAt = event.updatedAt;
  }
}
