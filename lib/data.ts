export type Dept = { id: string; name: string; icon: string; desc: string; items: string[]; img: string; href?: string };
export const DEPTS: Dept[] = [
  { id: 'maternity', name: 'Maternity', icon: 'ph-baby', desc: 'Antenatal clinic, labour and delivery, and postnatal care, from booking to discharge.', items: ['Antenatal clinic', 'Labour and delivery', 'Postnatal care', 'Special Care Baby Unit'], img: '/scbu.jpg', href: '/maternity' },
  { id: 'elmaor', name: 'Elmaor Fertility Clinic', icon: 'ph-heart', desc: 'Fertility assessment, IVF consultation and treatment cycles, and patient education.', items: [], img: '/elmaor-room.jpg', href: '/elmaor' },
  { id: 'paeds', name: 'Paediatrics', icon: 'ph-smiley', desc: 'Child health clinics, immunisation and care of newborns and young children.', items: ['Child health clinics', 'Immunisation', 'Care of newborns and young children'], img: '/nurses-station.jpg' },
  { id: 'gop', name: 'General outpatients', icon: 'ph-stethoscope', desc: 'Family medicine consultations, chronic disease follow-up and specialist clinics.', items: ['Family medicine consultations', 'Chronic disease follow-up', 'Specialist clinics'], img: '/reception.jpg' },
  { id: 'surgery', name: 'Surgery', icon: 'ph-first-aid-kit', desc: 'General surgery, urology and ENT procedures.', items: ['General surgery', 'Urology', 'ENT procedures'], img: '/corridor.jpg' },
  { id: 'lab', name: 'Laboratory', icon: 'ph-flask', desc: 'On-site diagnostic laboratory with analysers, centrifuge and sample processing.', items: ['Haematology and chemistry analysers', 'Incubator', 'Centrifuges and sample processing'], img: '/laboratory.jpg' },
  { id: 'radiology', name: 'Radiology', icon: 'ph-scan', desc: 'Diagnostic imaging, including obstetric ultrasound.', items: ['Diagnostic imaging', 'Obstetric ultrasound'], img: '/side-access.jpg' },
  { id: 'pharmacy', name: 'Pharmacy', icon: 'ph-pill', desc: 'In-house dispensary with refrigerated storage for vaccines and temperature-sensitive drugs.', items: ['In-house dispensary', 'Refrigerated cold-chain storage for vaccines', 'Temperature-sensitive drugs'], img: '/pharmacy-wide.jpg' },
];
export const deptHref = (d: Dept) => d.href ?? `/services/${d.id}`;
export const DOCS = [
  { role: 'Obstetrics & gynaecology', dept: 'maternity', days: ['Mon', 'Wed', 'Fri'] },
  { role: 'Obstetrics & gynaecology', dept: 'maternity', days: ['Tue', 'Thu', 'Sat'] },
  { role: 'Paediatrics', dept: 'paeds', days: ['Tue', 'Thu'] },
  { role: 'Fertility & IVF, Elmaor', dept: 'elmaor', days: ['Mon', 'Thu'] },
  { role: 'Family medicine', dept: 'gop', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
  { role: 'General surgery', dept: 'surgery', days: ['Wed', 'Sat'] },
  { role: 'Radiology & ultrasound', dept: 'radiology', days: ['Mon', 'Wed', 'Fri'] },
  { role: 'Laboratory medicine', dept: 'lab', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
];
export const HMOS = ['HMO A', 'HMO B', 'HMO C', 'HMO D', 'HMO E', 'HMO F'];
export const NAV = [
  { href: '/services', label: 'Services' }, { href: '/maternity', label: 'Maternity' }, { href: '/doctors', label: 'Doctors' },
  { href: '/news', label: 'Research & News' }, { href: '/hmos', label: 'HMOs' }, { href: '/about', label: 'About' }, { href: '/contact', label: 'Visit' },
];
export const BAG = ['Hospital card, ID and HMO card', 'Antenatal notes and scan reports', 'Nightwear, sanitary pads and toiletries', 'Baby clothes, cap and wrappers', 'Diapers and baby wipes', 'Clothes for going home'];
export const PHONES = ['0704 473 6867', '0909 865 5547'];
export const tel = (n: string) => 'tel:+234' + n.replace(/\D/g, '').slice(1);
// Placeholder: confirm the WhatsApp number with the hospital.
export const WA_URL = 'https://wa.me/2347044736867';
export const RED = '#B1232F', PUR = '#5A2A82', BLUE = '#1F4FB4';
export const ADDRESS = '10 Mobolaji Johnson Street, Apo Quarters Zone D, Gudu District, Abuja, Nigeria';
export const MAPS_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4910.463396441777!2d7.476961675872486!3d9.001071889423718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0cf50e056105%3A0xb2874f4b4b52b8d4!2sRouz%20Hospital%20and%20Maternity!5e1!3m2!1sen!2sng!4v1794936505607!5m2!1sen!2sng';
export const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Rouz Hospital and Maternity, ' + ADDRESS)}`;
export const GOOGLE_PROFILE = 'https://share.google/VBkLtEs2Z6VENvFf3';
