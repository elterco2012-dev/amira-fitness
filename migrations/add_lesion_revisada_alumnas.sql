-- Texto de la ficha de salud que Amira ya reviso y decidio no pasar al campo de
-- lesiones. Si la alumna despues declara algo distinto, no coincide y el aviso
-- del panel vuelve a aparecer. La IA no lee esta columna. Aplicada el 12/10/2026.
alter table alumnas add column if not exists lesion_revisada text;
