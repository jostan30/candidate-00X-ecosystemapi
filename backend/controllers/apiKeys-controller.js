const loadKeys = require("../utils/loadKeys");
const saveKeys = require("../utils/saveKeys");

const getKeys = (req, res) => {
  const rawKeys = loadKeys(); // { MailerLite: "123abc", Notion: "456def", ... }

  // Convert the object into an array of { name, key }
  const keys = Object.entries(rawKeys).map(([name, key]) => ({ name, key }));

  res.json({ keys });
};


const addKeys = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const rawKeys = loadKeys(); // Load as object - { MailerLite: "123abc", ... }
  
  // Check if key with this name already exists
  if (rawKeys[name]) {
    return res.status(400).json({ error: "Key with this name already exists" });
  }

  const newKeyValue = Math.random().toString(36).substr(2, 16);
  
  // Add to object (NOT array - no push!)
  rawKeys[name] = newKeyValue;
  saveKeys(rawKeys);

  const newKey = {
    id: name,
    name,
    key: newKeyValue,
  };

  res.status(201).json({ key: newKey });
};

const deleteKeys = (req, res) => {
  const { id } = req.params; // id is the key name
  const rawKeys = loadKeys(); // Load as object
  
  // Check if key exists
  if (!rawKeys[id]) {
    return res.status(404).json({ error: "Key not found" });
  }

  // Delete the key
  delete rawKeys[id];
  saveKeys(rawKeys);

  res.json({ success: true });
};

module.exports = {
  getKeys,
  addKeys,
  deleteKeys
};