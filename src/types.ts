export interface Post {
  id: number;
  titulo: string;
  contenido: string;
  autor_id: number;
  categoria_id: number | null;
  publicado: boolean;
  vistas: number;
  created_at: string;
  updated_at: string;
}