// supabase.js

// Supabase project credentials
const SUPABASE_URL = 'https://knzkugutacsrbmohswup.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtuemt1Z3V0YWNzcmJtb2hzd3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMTY1MzAsImV4cCI6MjA1NjU5MjUzMH0.SzNgWHq1pgz4xrPLseApowO1QPdMLyXjbfpJPbUgY7A';

// Initialize Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
window.supabaseClient = supabaseClient; // Expose globally

/** 
 * 📌 Fetch all diary entries (for Index Page) 
 * Displays all saved entries 
 */
async function fetchAllDiaryEntries() {
  const { data, error } = await supabaseClient
    .from('diary_entries')
    .select('*')
    .order('entry_date', { ascending: false });

  if (error) {
    console.error('Error fetching diary entries:', error);
  } else {
    console.log('Diary entries:', data);
    return data;
  }
}

/** 
 * 📌 Fetch entries for a specific date (For Date Page)
 * @param {string} date - Format: YYYY-MM-DD 
 */
async function fetchEntriesByDate(date) {
  const { data, error } = await supabaseClient
    .from('diary_entries')
    .select('*')
    .eq('entry_date', date)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching entries for date:', error);
  } else {
    console.log(`Entries for ${date}:`, data);
    return data;
  }
}

/** 
 * 📌 Create a new diary entry (For Entry Page) 
 * @param {string} date - Format: YYYY-MM-DD
 * @param {string} title - Entry title
 * @param {string} content - Entry content
 * @param {string} emojis - Emojis to describe the day
 */
async function createDiaryEntry(date, title, content, emojis = '') {
  const { data, error } = await supabaseClient
    .from('diary_entries')
    .insert([{ entry_date: date, title, content, emojis }]);

  if (error) {
    console.error('Error creating diary entry:', error);
  } else {
    console.log('Diary entry created:', data);
    return data;
  }
}

/** 
 * 📌 Edit an existing diary entry (For Edit Page) 
 * @param {string} id - Entry ID
 * @param {string} title - Updated title
 * @param {string} content - Updated content
 * @param {string} emojis - Updated emojis
 */
async function editDiaryEntry(id, title, content, emojis) {
  const { data, error } = await supabaseClient
    .from('diary_entries')
    .update({ title, content, emojis })
    .eq('id', id);

  if (error) {
    console.error('Error updating diary entry:', error);
  } else {
    console.log('Diary entry updated:', data);
    return data;
  }
}

/** 
 * 📌 Delete a diary entry (For Edit Page)
 * @param {string} id - Entry ID to delete
 */
async function deleteDiaryEntry(id) {
  const { data, error } = await supabaseClient
    .from('diary_entries')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting diary entry:', error);
  } else {
    console.log('Diary entry deleted:', data);
    return data;
  }
}

/** 
 * 📌 Fetch events for the calendar (For Index Page)
 */
async function fetchEvents() {
  const { data, error } = await supabaseClient
    .from('events')
    .select('*')
    .order('event_date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
  } else {
    console.log('Events:', data);
    return data;
  }
}

/** 
 * 📌 Create a new event (For New Event Popup)
 * @param {string} date - Format: YYYY-MM-DD
 * @param {string} title - Event title
 * @param {boolean} forever - Whether event repeats every year
 */
async function createEvent(date, title, forever = false) {
  const { data, error } = await supabaseClient
    .from('events')
    .insert([{ event_date: date, title, forever }]);

  if (error) {
    console.error('Error creating event:', error);
  } else {
    console.log('Event created:', data);
    return data;
  }
}
