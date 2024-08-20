const events = [];
 // create a new event
 async function createEvent(req, res){
  try{
    const {title, date, time, description} = req.body;
     
    // create a new event object 
    const newEvent = {
        id: events.length + 1,
        title,
        date,
        time,
        description,
        participants: []
    };

    // add the event to the array
    events.push(newEvent);
    return res.status(201).json({ message: 'Event created successfully', event: newEvent });
 }catch(err){
  return res.status(500).json({ error: 'Internal Server Error' });
 }
 }

 // Update an existing event
function updateEvent(req, res) {
    const eventId = parseInt(req.params.id);
    const { title, date, time, description } = req.body;
  
    // Find the event by ID
    const event = events.find(event => event.id === eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
  
    // Update the event details
    event.title = title || event.title;
    event.date = date || event.date;
    event.time = time || event.time;
    event.description = description || event.description;
  
    return res.status(200).json({ message: 'Event updated successfully', event });
  }
  // Delete an event
   function deleteEvent(req, res) {
    const eventId = parseInt(req.params.id);
  
    // Find the index of the event by ID
    const eventIndex = events.findIndex(event => event.id === eventId);
    if (eventIndex === -1) {
      return res.status(404).json({ message: 'Event not found' });
    }
  
    // Remove the event from the array
    events.splice(eventIndex, 1);
  
    return res.status(200).json({ message: 'Event deleted successfully' });
  }
  // Register a user for an event
function registerForEvent(req, res) {
    const eventId = parseInt(req.params.id);
  
    // Find the event by ID
    const event = events.find(event => event.id === eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
  
    // Check if the user is already registered
    if (event.participants.includes(req.userId)) {
      return res.status(400).json({ message: 'User already registered for this event' });
    }
  
    // Add the user to the participant list
    event.participants.push(req.userId);
  
    return res.status(200).json({ message: 'User registered for the event', event });
  }
  module.exports = { createEvent, updateEvent, deleteEvent,registerForEvent };