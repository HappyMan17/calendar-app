import EventModel from '../models/EventModel.js';

export const getEvents = (req, res) => {
  try {
    const events = EventModel.find().populate('user', 'name');

    return res.status(200).json({
      ok: true,
      msg: 'Get events',
      events,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Please talk with the administrator',
    });
  }
};

export const createEvent = async (req, res) => {
  try {
    const event = new EventModel(req.body);
    event.user = req.uid;
    const eventSaved = await event.save();

    return res.status(200).json({
      ok: true,
      msg: 'Event created',
      event: eventSaved,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Please talk with the administrator',
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const id = req.params.id;

    const event = await EventModel.findById(id);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'No event found with id ',
      });
    }

    if (event.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No permission to update this event',
      });
    }

    const newEvent = {
      ...req.body,
      user: req.uid,
    };

    const updatedEvent = await EventModel.findByIdAndUpdate(
      newEvent.id,
      newEvent,
      { new: true },
    );

    return res.status(200).json({
      ok: true,
      msg: 'Event updated',
      event: updatedEvent,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Please talk with the administrator',
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;

    const event = await EventModel.findById(id);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'No event found with id ',
      });
    }

    if (event.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No permission to update this event',
      });
    }

    await EventModel.findByIdAndDelete(
      id,
    );

    return res.status(200).json({
      ok: true,
      msg: 'Event deleted',
      event: id,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Please talk with the administrator',
    });
  }
};
