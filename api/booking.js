const crypto = require("crypto");

const DESTINATIONS = {
  "Göreme": {mail:"Goreme", display:"Göreme"}, "Goreme": {mail:"Goreme", display:"Göreme"},
  "Ürgüp": {mail:"Urgup", display:"Ürgüp"}, "Urgup": {mail:"Urgup", display:"Ürgüp"},
  "Uçhisar": {mail:"Uchisar", display:"Uçhisar"}, "Uchisar": {mail:"Uchisar", display:"Uçhisar"},
  "Avanos": {mail:"Avanos", display:"Avanos"},
  "Çavuşin": {mail:"Cavusin", display:"Çavuşin"}, "Cavusin": {mail:"Cavusin", display:"Çavuşin"},
  "Ortahisar": {mail:"Ortahisar", display:"Ortahisar"}
};
const LANGS = new Set(["en", "es", "zh-cn", "ko", "ja", "ru", "it", "de", "pt", "zh-tw", "fr", "th", "id", "ms-my"]);
const SERVICES = {
  shared:{label:"Shared Shuttle", mailLabel:"Paylaşımlı Shuttle", perPerson:15},
  vito:{label:"Private Vito", mailLabel:"Özel Vito", fixed:90, max:5},
  sprinter:{label:"Private Sprinter", mailLabel:"Özel Sprinter", fixed:110, max:16}
};
const L10N = {
  "en": {
    "bookingId": "Booking ID",
    "language": "Language",
    "trip": "Trip Type",
    "oneWay": "One Way",
    "roundTrip": "Round Trip",
    "service": "TRANSFER OPTION",
    "shared": "Shared Shuttle — €15 per person",
    "vito": "Private Vito — €90 per way (up to 5 passengers)",
    "sprinter": "Private Sprinter — €110 per way (up to 16 passengers)",
    "direction": "DIRECTION",
    "fromAirport": "From Kayseri Airport",
    "toAirport": "To Kayseri Airport",
    "airport": "Airport",
    "destination": "DESTINATION",
    "date": "TRANSFER DATE",
    "flight": "FLIGHT CODE",
    "flightTime": "FLIGHT TIME",
    "returnDate": "RETURN DATE",
    "returnFlight": "RETURN FLIGHT CODE",
    "hotel": "HOTEL / ACCOMMODATION",
    "passengers": "PASSENGERS",
    "contact": "CONTACT WHATSAPP",
    "payment": "PAYMENT",
    "cash": "Cash to driver — EUR / USD / TRY",
    "notes": "NOTES (OPTIONAL)",
    "passenger": "Passenger",
    "passport": "Passport number",
    "confirm": "Please confirm this transfer request.",
    "total": "Total Price",
    "notProvided": "—"
  },
  "es": {
    "bookingId": "ID de reserva",
    "language": "Idioma",
    "trip": "TIPO DE VIAJE",
    "oneWay": "Solo ida",
    "roundTrip": "Ida y vuelta",
    "service": "TIPO DE TRASLADO",
    "shared": "Shuttle compartido — €15 por persona",
    "vito": "Vito privado — €90 por trayecto (hasta 5 pasajeros)",
    "sprinter": "Sprinter privado — €110 por trayecto (hasta 16 pasajeros)",
    "direction": "DIRECCIÓN",
    "fromAirport": "Desde el Aeropuerto de Kayseri",
    "toAirport": "Al Aeropuerto de Kayseri",
    "airport": "Aeropuerto",
    "destination": "DESTINO",
    "date": "FECHA DEL TRASLADO",
    "flight": "CÓDIGO DE VUELO",
    "flightTime": "HORA DEL VUELO",
    "returnDate": "FECHA DE REGRESO",
    "returnFlight": "CÓDIGO DEL VUELO DE REGRESO",
    "hotel": "HOTEL / ALOJAMIENTO",
    "passengers": "PASAJEROS",
    "contact": "WHATSAPP DE CONTACTO",
    "payment": "PAGO",
    "cash": "Efectivo al conductor — EUR / USD / TRY",
    "notes": "NOTAS (OPCIONAL)",
    "passenger": "Pasajero",
    "passport": "Número de pasaporte",
    "confirm": "Confirme esta solicitud de traslado.",
    "total": "Precio total",
    "notProvided": "—"
  },
  "zh-cn": {
    "bookingId": "预订编号",
    "language": "语言",
    "trip": "行程类型",
    "oneWay": "单程",
    "roundTrip": "往返",
    "service": "接送类型",
    "shared": "拼车接送 — €15/人",
    "vito": "私人 Vito — €90/程（最多5人）",
    "sprinter": "私人 Sprinter — €110/程（最多16人）",
    "direction": "接送方向",
    "fromAirport": "从开塞利机场出发",
    "toAirport": "前往开塞利机场",
    "airport": "机场",
    "destination": "目的地",
    "date": "接送日期",
    "flight": "航班号",
    "flightTime": "航班时间",
    "returnDate": "返程日期",
    "returnFlight": "返程航班号",
    "hotel": "酒店 / 住宿",
    "passengers": "乘客人数",
    "contact": "联系 WhatsApp",
    "payment": "付款",
    "cash": "向司机现金付款 — EUR / USD / TRY",
    "notes": "备注（可选）",
    "passenger": "乘客",
    "passport": "护照号码",
    "confirm": "请确认这项接送申请。",
    "total": "总价",
    "notProvided": "—"
  },
  "ko": {
    "bookingId": "예약 ID",
    "language": "언어",
    "trip": "여행 유형",
    "oneWay": "편도",
    "roundTrip": "왕복",
    "service": "트랜스퍼 옵션",
    "shared": "공용 셔틀 — 1인 €15",
    "vito": "프라이빗 Vito — 편도 €90 (최대 5명)",
    "sprinter": "프라이빗 Sprinter — 편도 €110 (최대 16명)",
    "direction": "이동 방향",
    "fromAirport": "카이세리 공항에서 출발",
    "toAirport": "카이세리 공항으로 이동",
    "airport": "공항",
    "destination": "목적지",
    "date": "이동 날짜",
    "flight": "항공편 번호",
    "flightTime": "항공편 시간",
    "returnDate": "귀국편 날짜",
    "returnFlight": "귀국편 항공편 번호",
    "hotel": "호텔 / 숙소",
    "passengers": "승객 수",
    "contact": "연락용 WhatsApp",
    "payment": "결제",
    "cash": "Cash to driver — EUR / USD / TRY",
    "notes": "메모 (선택 사항)",
    "passenger": "승객",
    "passport": "여권 번호",
    "confirm": "이 이동 서비스를 신청합니다.",
    "total": "총 금액",
    "notProvided": "—"
  },
  "ja": {
    "bookingId": "予約ID",
    "language": "言語",
    "trip": "旅行タイプ",
    "oneWay": "片道",
    "roundTrip": "往復",
    "service": "送迎オプション",
    "shared": "乗合シャトル — 1名€15",
    "vito": "貸切 Vito — 片道€90（最大5名）",
    "sprinter": "貸切 Sprinter — 片道€110（最大16名）",
    "direction": "送迎方向",
    "fromAirport": "カイセリ空港から",
    "toAirport": "カイセリ空港へ",
    "airport": "空港",
    "destination": "目的地",
    "date": "送迎日",
    "flight": "便名",
    "flightTime": "フライト時刻",
    "returnDate": "復路日",
    "returnFlight": "復路便名",
    "hotel": "ホテル / 宿泊施設",
    "passengers": "乗客数",
    "contact": "連絡先 WhatsApp",
    "payment": "支払い",
    "cash": "Cash to driver — EUR / USD / TRY",
    "notes": "備考（任意）",
    "passenger": "乗客",
    "passport": "パスポート番号",
    "confirm": "この送迎リクエストをご確認ください。",
    "total": "合計金額",
    "notProvided": "—"
  },
  "ru": {
    "bookingId": "ID бронирования",
    "language": "Язык",
    "trip": "ТИП ПОЕЗДКИ",
    "oneWay": "В одну сторону",
    "roundTrip": "Туда и обратно",
    "service": "ВАРИАНТ ТРАНСФЕРА",
    "shared": "Общий шаттл — €15 с человека",
    "vito": "Частный Vito — €90 за поездку (до 5 пассажиров)",
    "sprinter": "Частный Sprinter — €110 за поездку (до 16 пассажиров)",
    "direction": "НАПРАВЛЕНИЕ",
    "fromAirport": "Из аэропорта Кайсери",
    "toAirport": "В аэропорт Кайсери",
    "airport": "Аэропорт",
    "destination": "МЕСТО НАЗНАЧЕНИЯ",
    "date": "ДАТА ТРАНСФЕРА",
    "flight": "КОД РЕЙСА",
    "flightTime": "ВРЕМЯ РЕЙСА",
    "returnDate": "ДАТА ОБРАТНОГО ТРАНСФЕРА",
    "returnFlight": "КОД ОБРАТНОГО РЕЙСА",
    "hotel": "ОТЕЛЬ / ОБЪЕКТ РАЗМЕЩЕНИЯ",
    "passengers": "ПАССАЖИРЫ",
    "contact": "WHATSAPP ДЛЯ СВЯЗИ",
    "payment": "ОПЛАТА",
    "cash": "Cash to driver — EUR / USD / TRY",
    "notes": "ПРИМЕЧАНИЯ (НЕОБЯЗАТЕЛЬНО)",
    "passenger": "Пассажир",
    "passport": "Номер паспорта",
    "confirm": "Пожалуйста, подтвердите заявку на этот трансфер.",
    "total": "Итоговая стоимость",
    "notProvided": "—"
  },
  "it": {
    "bookingId": "ID prenotazione",
    "language": "Lingua",
    "trip": "TIPO DI VIAGGIO",
    "oneWay": "Solo andata",
    "roundTrip": "Andata e ritorno",
    "service": "TIPO DI TRANSFER",
    "shared": "Shuttle condiviso — €15 a persona",
    "vito": "Vito privato — €90 a tratta (fino a 5 passeggeri)",
    "sprinter": "Sprinter privato — €110 a tratta (fino a 16 passeggeri)",
    "direction": "DIREZIONE",
    "fromAirport": "Dall’Aeroporto di Kayseri",
    "toAirport": "Verso l’Aeroporto di Kayseri",
    "airport": "Aeroporto",
    "destination": "DESTINAZIONE",
    "date": "DATA DEL TRANSFER",
    "flight": "CODICE VOLO",
    "flightTime": "ORARIO VOLO",
    "returnDate": "DATA DEL RITORNO",
    "returnFlight": "CODICE VOLO DI RITORNO",
    "hotel": "HOTEL / ALLOGGIO",
    "passengers": "PASSEGGERI",
    "contact": "WHATSAPP DI CONTATTO",
    "payment": "PAGAMENTO",
    "cash": "Contanti all’autista — EUR / USD / TRY",
    "notes": "NOTE (FACOLTATIVE)",
    "passenger": "Passeggero",
    "passport": "Numero di passaporto",
    "confirm": "Conferma questa richiesta di transfer.",
    "total": "Prezzo totale",
    "notProvided": "—"
  },
  "de": {
    "bookingId": "Buchungs-ID",
    "language": "Sprache",
    "trip": "REISEART",
    "oneWay": "Einfache Fahrt",
    "roundTrip": "Hin- und Rückfahrt",
    "service": "TRANSFERART",
    "shared": "Sammelshuttle — €15 pro Person",
    "vito": "Privater Vito — €90 pro Strecke (bis 5 Personen)",
    "sprinter": "Privater Sprinter — €110 pro Strecke (bis 16 Personen)",
    "direction": "RICHTUNG",
    "fromAirport": "Vom Flughafen Kayseri",
    "toAirport": "Zum Flughafen Kayseri",
    "airport": "Flughafen",
    "destination": "ZIEL",
    "date": "TRANSFERDATUM",
    "flight": "FLUGNUMMER",
    "flightTime": "FLUGZEIT",
    "returnDate": "RÜCKFAHRTSDATUM",
    "returnFlight": "RÜCKFLUGNUMMER",
    "hotel": "HOTEL / UNTERKUNFT",
    "passengers": "PASSAGIERE",
    "contact": "KONTAKT-WHATSAPP",
    "payment": "ZAHLUNG",
    "cash": "Bar beim Fahrer — EUR / USD / TRY",
    "notes": "ANMERKUNGEN (OPTIONAL)",
    "passenger": "Passagier",
    "passport": "Reisepassnummer",
    "confirm": "Bitte bestätigen Sie diese Transferanfrage.",
    "total": "Gesamtpreis",
    "notProvided": "—"
  },
  "pt": {
    "bookingId": "ID da reserva",
    "language": "Idioma",
    "trip": "TIPO DE VIAGEM",
    "oneWay": "Só ida",
    "roundTrip": "Ida e volta",
    "service": "TIPO DE TRANSFER",
    "shared": "Shuttle partilhado — €15 por pessoa",
    "vito": "Vito privado — €90 por trajeto (até 5 passageiros)",
    "sprinter": "Sprinter privado — €110 por trajeto (até 16 passageiros)",
    "direction": "DIREÇÃO",
    "fromAirport": "Do Aeroporto de Kayseri",
    "toAirport": "Para o Aeroporto de Kayseri",
    "airport": "Aeroporto",
    "destination": "DESTINO",
    "date": "DATA DO TRANSFER",
    "flight": "NÚMERO DO VOO",
    "flightTime": "HORA DO VOO",
    "returnDate": "DATA DE REGRESSO",
    "returnFlight": "NÚMERO DO VOO DE REGRESSO",
    "hotel": "HOTEL / ALOJAMENTO",
    "passengers": "PASSAGEIROS",
    "contact": "WHATSAPP DE CONTACTO",
    "payment": "PAGAMENTO",
    "cash": "Dinheiro ao motorista — EUR / USD / TRY",
    "notes": "NOTAS (OPCIONAL)",
    "passenger": "Passageiro",
    "passport": "Número do passaporte",
    "confirm": "Confirme este pedido de transfer.",
    "total": "Preço total",
    "notProvided": "—"
  },
  "zh-tw": {
    "bookingId": "預訂編號",
    "language": "語言",
    "trip": "行程類型",
    "oneWay": "單程",
    "roundTrip": "往返",
    "service": "接送類型",
    "shared": "共乘接送 — €15/人",
    "vito": "私人 Vito — €90/程（最多5人）",
    "sprinter": "私人 Sprinter — €110/程（最多16人）",
    "direction": "接送方向",
    "fromAirport": "從開塞利機場出發",
    "toAirport": "前往開塞利機場",
    "airport": "機場",
    "destination": "目的地",
    "date": "接送日期",
    "flight": "航班號",
    "flightTime": "航班時間",
    "returnDate": "返程日期",
    "returnFlight": "返程航班號",
    "hotel": "飯店 / 住宿",
    "passengers": "乘客人數",
    "contact": "聯絡 WhatsApp",
    "payment": "付款",
    "cash": "向司機現金付款 — EUR / USD / TRY",
    "notes": "備註（可選）",
    "passenger": "乘客",
    "passport": "護照號碼",
    "confirm": "請確認這項接送申請。",
    "total": "總價",
    "notProvided": "—"
  },
  "fr": {
    "bookingId": "ID de réservation",
    "language": "Langue",
    "trip": "TYPE DE TRAJET",
    "oneWay": "Aller simple",
    "roundTrip": "Aller-retour",
    "service": "TYPE DE TRANSFERT",
    "shared": "Navette partagée — 15 € par personne",
    "vito": "Vito privé — 90 € par trajet (jusqu’à 5 passagers)",
    "sprinter": "Sprinter privé — 110 € par trajet (jusqu’à 16 passagers)",
    "direction": "SENS",
    "fromAirport": "Depuis l’aéroport de Kayseri",
    "toAirport": "Vers l’aéroport de Kayseri",
    "airport": "Aéroport",
    "destination": "DESTINATION",
    "date": "DATE DU TRANSFERT",
    "flight": "NUMÉRO DE VOL",
    "flightTime": "HEURE DU VOL",
    "returnDate": "DATE DU RETOUR",
    "returnFlight": "NUMÉRO DU VOL RETOUR",
    "hotel": "HÔTEL / HÉBERGEMENT",
    "passengers": "PASSAGERS",
    "contact": "WHATSAPP DE CONTACT",
    "payment": "PAIEMENT",
    "cash": "Espèces au chauffeur — EUR / USD / TRY",
    "notes": "REMARQUES (FACULTATIF)",
    "passenger": "Passager",
    "passport": "Numéro de passeport",
    "confirm": "Veuillez confirmer cette demande de transfert.",
    "total": "Prix total",
    "notProvided": "—"
  },
  "th": {
    "bookingId": "รหัสการจอง",
    "language": "ภาษา",
    "trip": "ประเภทการเดินทาง",
    "oneWay": "เที่ยวเดียว",
    "roundTrip": "ไป-กลับ",
    "service": "ประเภทรถรับส่ง",
    "shared": "รถรับส่งแบบแชร์ — €15 ต่อคน",
    "vito": "Vito ส่วนตัว — €90 ต่อเที่ยว (สูงสุด 5 คน)",
    "sprinter": "Sprinter ส่วนตัว — €110 ต่อเที่ยว (สูงสุด 16 คน)",
    "direction": "ทิศทางการเดินทาง",
    "fromAirport": "จากสนามบิน Kayseri",
    "toAirport": "ไปสนามบิน Kayseri",
    "airport": "สนามบิน",
    "destination": "จุดหมาย",
    "date": "วันที่เดินทาง",
    "flight": "รหัสเที่ยวบิน",
    "flightTime": "เวลาเที่ยวบิน",
    "returnDate": "วันที่เดินทางกลับ",
    "returnFlight": "รหัสเที่ยวบินขากลับ",
    "hotel": "โรงแรม / ที่พัก",
    "passengers": "จำนวนผู้โดยสาร",
    "contact": "WHATSAPP สำหรับติดต่อ",
    "payment": "การชำระเงิน",
    "cash": "Cash to driver — EUR / USD / TRY",
    "notes": "หมายเหตุ (ไม่บังคับ)",
    "passenger": "ผู้โดยสาร",
    "passport": "หมายเลขหนังสือเดินทาง",
    "confirm": "กรุณายืนยันคำขอใช้บริการรถรับส่งนี้",
    "total": "ราคารวม",
    "notProvided": "—"
  },
  "id": {
    "bookingId": "ID pemesanan",
    "language": "Bahasa",
    "trip": "JENIS PERJALANAN",
    "oneWay": "Sekali jalan",
    "roundTrip": "Pulang pergi",
    "service": "JENIS TRANSFER",
    "shared": "Shuttle bersama — €15 per orang",
    "vito": "Vito privat — €90 sekali jalan (maks. 5 penumpang)",
    "sprinter": "Sprinter privat — €110 sekali jalan (maks. 16 penumpang)",
    "direction": "ARAH PERJALANAN",
    "fromAirport": "Dari Bandara Kayseri",
    "toAirport": "Ke Bandara Kayseri",
    "airport": "Bandara",
    "destination": "TUJUAN",
    "date": "TANGGAL TRANSFER",
    "flight": "NOMOR PENERBANGAN",
    "flightTime": "WAKTU PENERBANGAN",
    "returnDate": "TANGGAL PULANG",
    "returnFlight": "NOMOR PENERBANGAN PULANG",
    "hotel": "HOTEL / AKOMODASI",
    "passengers": "PENUMPANG",
    "contact": "WHATSAPP KONTAK",
    "payment": "PEMBAYARAN",
    "cash": "Cash to driver — EUR / USD / TRY",
    "notes": "CATATAN (OPSIONAL)",
    "passenger": "Penumpang",
    "passport": "Nomor paspor",
    "confirm": "Mohon konfirmasi permintaan transfer ini.",
    "total": "Total harga",
    "notProvided": "—"
  },
  "ms-my": {
    "bookingId": "ID tempahan",
    "language": "Bahasa",
    "trip": "JENIS PERJALANAN",
    "oneWay": "Sehala",
    "roundTrip": "Pergi balik",
    "service": "JENIS TRANSFER",
    "shared": "Shuttle berkongsi — €15 seorang",
    "vito": "Vito persendirian — €90 sehala (maks. 5 penumpang)",
    "sprinter": "Sprinter persendirian — €110 sehala (maks. 16 penumpang)",
    "direction": "ARAH PERJALANAN",
    "fromAirport": "Dari Lapangan Terbang Kayseri",
    "toAirport": "Ke Lapangan Terbang Kayseri",
    "airport": "Lapangan terbang",
    "destination": "DESTINASI",
    "date": "TARIKH TRANSFER",
    "flight": "KOD PENERBANGAN",
    "flightTime": "MASA PENERBANGAN",
    "returnDate": "TARIKH PULANG",
    "returnFlight": "KOD PENERBANGAN PULANG",
    "hotel": "HOTEL / PENGINAPAN",
    "passengers": "PENUMPANG",
    "contact": "WHATSAPP UNTUK DIHUBUNGI",
    "payment": "BAYARAN",
    "cash": "Cash to driver — EUR / USD / TRY",
    "notes": "CATATAN (PILIHAN)",
    "passenger": "Penumpang",
    "passport": "Nombor pasport",
    "confirm": "Sila sahkan permintaan transfer ini.",
    "total": "Jumlah harga",
    "notProvided": "—"
  }
};
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function clean(value, max=300){ return String(value ?? "").trim().replace(/[\r\n\t]+/g," ").slice(0,max); }
function esc(value){ return clean(value,2000).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch])); }
function normalizePhone(value){
  let digits=clean(value,40).replace(/\D/g,"");
  if(digits.startsWith("00")) digits=digits.slice(2);
  return digits.slice(0,15);
}
function bookingId(){
  const parts=new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Istanbul",month:"2-digit",day:"2-digit"}).formatToParts(new Date());
  const mm=parts.find(p=>p.type==="month").value, dd=parts.find(p=>p.type==="day").value;
  let suffix="";
  for(let i=0;i<4;i++) suffix += CODE_CHARS[crypto.randomInt(0,CODE_CHARS.length)];
  return `KAT-${mm}${dd}-${suffix}`;
}
function row(label,value){ return `<tr><td style="padding:9px 12px;border:1px solid #d8dde6;font-weight:700;vertical-align:top;white-space:nowrap;background:#f7f9fc">${esc(label)}</td><td style="padding:9px 12px;border:1px solid #d8dde6;vertical-align:top">${value}</td></tr>`; }
function stripHtml(value){ return String(value).replace(/<br\s*\/?\s*>/gi," | ").replace(/<[^>]+>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'"); }
function plainLine(label,value){ return `${label}: ${stripHtml(value)}`; }

module.exports = async function handler(req,res){
  res.setHeader("Cache-Control","no-store");
  if(req.method !== "POST") return res.status(405).json({error:"method_not_allowed"});
  const body = typeof req.body === "string" ? (()=>{try{return JSON.parse(req.body)}catch{return {}}})() : (req.body || {});
  if(clean(body.website,100)) return res.status(200).json({ok:true});

  const language = LANGS.has(clean(body.language,20)) ? clean(body.language,20) : "en";
  const l=L10N[language] || L10N.en;
  const tripType = body.tripType === "round_trip" ? "round_trip" : "one_way";
  const serviceKey = clean(body.service,30);
  const service = SERVICES[serviceKey];
  const directionKey = body.direction === "to_airport" ? "to_airport" : "from_airport";
  const destination = DESTINATIONS[clean(body.destination,60)];
  const date=clean(body.date,20), flight=clean(body.flight,30).toUpperCase(), flightTime=clean(body.flightTime,10);
  const returnDate=clean(body.returnDate,20), returnFlight=clean(body.returnFlight,30).toUpperCase();
  const hotel=clean(body.hotel,180), notes=clean(body.notes,1000);
  const contactWhatsApp=normalizePhone(body.contactWhatsApp);
  const passengerCount=Math.max(1,Math.min(16,Number(body.passengerCount)||1));
  const passengers=Array.isArray(body.passengers) ? body.passengers.slice(0,16).map(p=>({name:clean(p?.name,100),passport:clean(p?.passport,50)})) : [];

  const errors=[];
  if(!service) errors.push("service");
  if(!destination) errors.push("destination");
  if(!/^\d{4}-\d{2}-\d{2}$/.test(date)) errors.push("date");
  if(directionKey==="from_airport" && !/^\d{2}:\d{2}$/.test(flightTime)) errors.push("flight_time");
  if(tripType==="round_trip" && !/^\d{2}:\d{2}$/.test(flightTime)) errors.push("flight_time");
  if(!/^[A-Z0-9]{2,12}$/.test(flight)) errors.push("flight");
  if(hotel.length<2) errors.push("hotel");
  if(contactWhatsApp.length<7 || contactWhatsApp.length>15) errors.push("contact_whatsapp");
  if(passengers.length!==passengerCount || passengers.some(p=>!p.name)) errors.push("passengers");
  if(tripType==="round_trip" && (!/^\d{4}-\d{2}-\d{2}$/.test(returnDate) || !/^[A-Z0-9]{2,12}$/.test(returnFlight))) errors.push("return");
  if(service?.max && passengerCount>service.max) errors.push("capacity");
  if(errors.length) return res.status(400).json({error:"invalid_booking_data",fields:errors,message:"Please check the booking details and try again."});

  // The browser creates a fresh ID on every submit so WhatsApp can still work if email/API delivery fails.
  // If an older client does not send one, generate it here as a fallback.
  const requestedId=clean(body.bookingId,20).toUpperCase();
  const id=/^KAT-\d{4}-[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{4}$/.test(requestedId) ? requestedId : bookingId();
  const legs=tripType==="round_trip" ? 2 : 1;
  const total = service.perPerson ? service.perPerson*passengerCount*legs : service.fixed*legs;
  const mailTransferType = tripType==="round_trip" ? "Gidiş-Dönüş Transfer" : "Tek Yön Transfer";
  const mailDirection = tripType==="round_trip" ? "Havalimanı ⇄ Otel" : (directionKey==="from_airport" ? "Havalimanı → Otel" : "Otel → Havalimanı");
  const dateLabel = directionKey==="to_airport" && tripType!=="round_trip" ? "Kalkış" : "Varış";
  const dateValue = directionKey==="to_airport" && tripType!=="round_trip"
    ? `${date} · ${flight}`
    : `${date} ${flightTime} · ${flight}`;
  const paymentMail="Sürücüye nakit (EUR / USD / TRY)";
  const noteValue=notes || "—";
  const phoneDisplay=`+${contactWhatsApp}`;
  const customerWaUrl=`https://wa.me/${contactWhatsApp}`;
  const contactHtml=`${esc(phoneDisplay)}<br><a href="${customerWaUrl}" style="display:inline-block;margin-top:6px;color:#0b7a45;font-weight:700;text-decoration:none">WhatsApp'tan müşteriye yaz →</a>`;

  const mailRows=[];
  mailRows.push(["Rezervasyon ID",id]);
  mailRows.push(["Dil",language]);
  mailRows.push(["Transfer Tipi",mailTransferType]);
  mailRows.push(["Hizmet",service.mailLabel]);
  mailRows.push(["Yön",mailDirection]);
  mailRows.push(["Havalimanı","Kayseri Havalimanı (ASR)"]);
  mailRows.push(["Destinasyon",destination.mail]);
  mailRows.push([dateLabel,esc(dateValue)]);
  if(tripType==="round_trip"){
    mailRows.push(["Dönüş",esc(`${returnDate} · ${returnFlight}`)]);
    mailRows.push(["Dönüşte Otelden Alış Saati","Uçuş kodunuza göre ayarlanıp size bildirilecektir"]);
  } else if(directionKey==="to_airport") {
    mailRows.push(["Otelden Alış Saati","Uçuş kodunuza göre ayarlanıp size bildirilecektir"]);
  }
  mailRows.push(["Otel / Konaklama",esc(hotel)]);
  mailRows.push(["Yolcu Sayısı",String(passengerCount)]);
  mailRows.push(["İletişim WhatsApp",contactHtml]);
  passengers.forEach((p,i)=>mailRows.push([`Yolcu ${i+1}`,`${esc(p.name)}<br>Pasaport: ${esc(p.passport || "—")}`]));
  mailRows.push(["Toplam Fiyat",`EUR ${total}`]);
  mailRows.push(["Ödeme",paymentMail]);
  mailRows.push(["Notlar",esc(noteValue)]);

  const html=`<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#172033;background:#fff"><div style="max-width:760px;margin:0 auto;padding:24px"><h2 style="margin:0 0 18px">Yeni rezervasyon talebi</h2><table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px">${mailRows.map(([a,b])=>row(a,b)).join("")}</table><p style="margin-top:18px;font-size:12px;line-height:1.5;color:#5d6678">Pasaport bilgileri rezervasyon işlemi için gönderilmiştir. Bu e-postayı güvenli şekilde saklayın ve gereksiz yere iletmeyin.</p></div></body></html>`;
  const text=`Yeni rezervasyon talebi\n\n${mailRows.map(([a,b])=>plainLine(a,b)).join("\n")}\n\nMüşteri WhatsApp: ${customerWaUrl}`;

  const tripText=tripType==="round_trip" ? l.roundTrip : l.oneWay;
  const serviceText=serviceKey==="shared" ? l.shared : (serviceKey==="vito" ? l.vito : l.sprinter);
  const directionText=tripType==="round_trip" ? `${l.fromAirport} ⇄ ${l.toAirport}` : (directionKey==="from_airport" ? l.fromAirport : l.toAirport);
  const wa=[];
  wa.push("Booking request");
  wa.push("");
  wa.push(`${l.bookingId}: ${id}`);
  wa.push(`${l.language}: ${language}`);
  wa.push(`${l.trip}: ${tripText}`);
  wa.push(`${l.service}: ${serviceText}`);
  wa.push(`${l.direction}: ${directionText}`);
  wa.push(`${l.airport}: Kayseri Airport (ASR)`);
  wa.push(`${l.destination}: ${destination.display}`);
  wa.push(`${l.date}: ${date}`);
  wa.push(`${l.flight}: ${flight}${flightTime ? ` · ${flightTime}` : ""}`);
  if(tripType==="round_trip"){
    wa.push(`${l.returnDate}: ${returnDate}`);
    wa.push(`${l.returnFlight}: ${returnFlight}`);
  }
  wa.push(`${l.hotel}: ${hotel}`);
  wa.push(`${l.passengers}: ${passengerCount}`);
  wa.push(`${l.contact}: ${phoneDisplay}`);
  passengers.forEach((p,i)=>{ wa.push(`${l.passenger} ${i+1}: ${p.name}`); wa.push(`${l.passport}: ${p.passport || "—"}`); });
  wa.push(`${l.total}: EUR ${total}`);
  wa.push(`${l.payment}: ${l.cash}`);
  wa.push(`${l.notes}: ${noteValue}`);
  wa.push("");
  wa.push(l.confirm);
  const whatsappMessage=wa.join("\n");

  const apiKey=process.env.RESEND_API_KEY || "";
  const from=process.env.RESEND_FROM_EMAIL || "Kayseri Airport Transfer <onboarding@resend.dev>";
  const to=process.env.BOOKING_TO_EMAIL || process.env.RESEND_TO_EMAIL || "";
  let emailOk=false, emailId=null, emailStatus="not_attempted";

  console.log("BOOKING_RECEIVED",{
    bookingId:id,
    locale,
    direction:directionKey,
    destination:destination.mail,
    hasResendApiKey:!!apiKey,
    hasBookingRecipient:!!to
  });

  if(!apiKey){
    emailStatus="skipped_missing_resend_api_key";
    console.error("EMAIL_SKIPPED: RESEND_API_KEY missing",{bookingId:id});
  }else if(!to){
    emailStatus="skipped_missing_booking_to_email";
    console.error("EMAIL_SKIPPED: BOOKING_TO_EMAIL / RESEND_TO_EMAIL missing",{bookingId:id});
  }else{
    try{
      emailStatus="sending";
      console.log("RESEND_SEND_START",{bookingId:id,from,toConfigured:true});

      const rr=await fetch("https://api.resend.com/emails",{
        method:"POST",
        headers:{"Authorization":`Bearer ${apiKey}`,"Content-Type":"application/json"},
        body:JSON.stringify({
          from,
          to:[to],
          subject:`Yeni rezervasyon · ${id} · ${destination.mail} · ${service.label}`,
          html,
          text
        })
      });

      const resendBody=await rr.json().catch(()=>({}));

      if(rr.ok){
        emailOk=true;
        emailId=resendBody.id || null;
        emailStatus="sent";
        console.log("RESEND_SEND_OK",{bookingId:id,emailId});
      }else{
        emailStatus=`failed_http_${rr.status}`;
        console.error("RESEND_SEND_FAILED",{
          status:rr.status,
          bookingId:id,
          error:resendBody
        });
      }
    }catch(err){
      emailStatus="failed_exception";
      console.error("RESEND_SEND_EXCEPTION",{
        bookingId:id,
        message:err?.message || String(err)
      });
    }
  }

  // WhatsApp is the safety net: email failure never blocks the customer's booking request.
  return res.status(200).json({
    ok:true,
    bookingId:id,
    totalPrice:`EUR ${total}`,
    emailOk,
    emailStatus,
    emailId,
    whatsappMessage
  });
};
