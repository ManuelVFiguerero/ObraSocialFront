export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  AllNotifications: { type: 'New' | 'Read' | 'Announcement' };
  TurnoDetail: { turnoId: number };
  ConsultDetail: {
    id: number;
    fecha: string;
    profesional: string;
    motivo: string;
    descripcion: string;
    userId: number;
    fotoUrl?: string;
  };
};