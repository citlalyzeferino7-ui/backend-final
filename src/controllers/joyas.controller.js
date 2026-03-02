import joyasRepository from '../repositories/joyas.repository.js';


export const getAllJoyas = async (req, res) => {
  const joyas = await joyasRepository.getAll();
  res.json(joyas);
};

export const getJoya1 = async (req, res) => {
  const joya = await joyasRepository.getById(1);
  if (!joya) return res.status(404).json({ error: 'Joya no encontrada' });
  res.json(joya);
};

export const createJoya = async (req, res) => {
  const nueva = await joyasRepository.create(req.body);
  res.status(201).json(nueva);
};

export const updateJoya1 = async (req, res) => {
  const updated = await joyasRepository.update(1, req.body);
  if (!updated) return res.status(404).json({ error: 'Joya no encontrada' });
  res.json(updated);
};

export const deleteJoya1 = async (req, res) => {
  const deleted = await joyasRepository.delete(1);
  if (!deleted) return res.status(404).json({ error: 'Joya no encontrada' });
  res.json({ message: 'Joya eliminada' });
};