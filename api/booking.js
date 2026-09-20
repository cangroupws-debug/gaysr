const crypto = require("crypto");

const DESTINATIONS = {
  "Göreme": "Goreme", "Goreme": "Goreme",
  "Ürgüp": "Urgup", "Urgup": "Urgup",
  "Uçhisar": "Uchisar", "Uchisar": "Uchisar",
  "Avanos": "Avanos",
  "Çavuşin": "Cavusin", "Cavusin": "Cavusin",
  "Ortahisar": "Ortahisar"
};
const LANGS = new Set(["en","es","zh-cn","ko","ja","ru","it","de","pt","zh-tw","fr","th","id","ms-my"]);
const SERVICES = {
  shared:{label:"Shared Shuttle", perPerson:15},
  vito:{label:"Private Vito", fixed:90, max:5},
  sprinter:{label:"Private Sprinter", fixed:110, max:16}
};
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function clean(value, max=300){ return String(value ?? "").trim().replace(/[\r\n\t]+/g," ").slice(0,max); }
function esc(value){ return clean(value,2000).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch])); }
function bookingId(){
  const parts=new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Istanbul",month:"2-digit",day:"2-digit"}).formatToParts(new Date());
  const mm=parts.find(p=>p.type==="month").value, dd=parts.find(p=>p.type==="day").value;
  let suffix="";
  for(let i=0;i<4;i++) suffix += CODE_CHARS[crypto.randomInt(0,CODE_CHARS.length)];
  return `KTC-${mm}${dd}-${suffix}`;
}
function row(label,value){ return `<tr><td style="padding:9px 12px;border:1px solid #d8dde6;font-weight:700;vertical-align:top;white-space:nowrap">${esc(label)}</td><td style="padding:9px 12px;border:1px solid #d8dde6;vertical-align:top">${value}</td></tr>`; }
function plainLine(label,value){ const v=String(value).replace(/<br\s*\/?\s*>/gi," | ").replace(/<[^>]+>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'"); return `${label}: ${v}`; }

module.exports = async function handler(req,res){
  res.setHeader("Cache-Control","no-store");
  if(req.method !== "POST") return res.status(405).json({error:"method_not_allowed"});
  const body = typeof req.body === "string" ? (()=>{try{return JSON.parse(req.body)}catch{return {}}})() : (req.body || {});
  if(clean(body.website,100)) return res.status(200).json({ok:true}); // honeypot

  const language = LANGS.has(clean(body.language,20)) ? clean(body.language,20) : "en";
  const tripType = body.tripType === "round_trip" ? "round_trip" : "one_way";
  const serviceKey = clean(body.service,30);
  const service = SERVICES[serviceKey];
  const directionKey = body.direction === "to_airport" ? "to_airport" : "from_airport";
  const destination = DESTINATIONS[clean(body.destination,60)];
  const date=clean(body.date,20), flight=clean(body.flight,30).toUpperCase(), flightTime=clean(body.flightTime,10);
  const returnDate=clean(body.returnDate,20), returnFlight=clean(body.returnFlight,30).toUpperCase();
  const hotel=clean(body.hotel,180), notes=clean(body.notes,1000);
  const contactWhatsApp=clean(body.contactWhatsApp,40).replace(/[^0-9+]/g,"").replace(/^\+/,"");
  const passengerCount=Math.max(1,Math.min(16,Number(body.passengerCount)||1));
  const passengers=Array.isArray(body.passengers) ? body.passengers.slice(0,16).map(p=>({name:clean(p?.name,100),passport:clean(p?.passport,50)})) : [];

  const errors=[];
  if(!service) errors.push("service");
  if(!destination) errors.push("destination");
  if(!/^\d{4}-\d{2}-\d{2}$/.test(date)) errors.push("date");
  if(!/^\d{2}:\d{2}$/.test(flightTime)) errors.push("flight_time");
  if(!/^[A-Z0-9]{2,12}$/.test(flight)) errors.push("flight");
  if(hotel.length<2) errors.push("hotel");
  if(contactWhatsApp.length<7) errors.push("contact_whatsapp");
  if(passengers.length!==passengerCount || passengers.some(p=>!p.name || !p.passport)) errors.push("passengers");
  if(tripType==="round_trip" && (!/^\d{4}-\d{2}-\d{2}$/.test(returnDate) || !/^[A-Z0-9]{2,12}$/.test(returnFlight))) errors.push("return");
  if(service?.max && passengerCount>service.max) errors.push("capacity");
  if(errors.length) return res.status(400).json({error:"invalid_booking_data",fields:errors,message:"Please check the booking details and try again."});

  const id=bookingId();
  const legs=tripType==="round_trip" ? 2 : 1;
  const total = service.perPerson ? service.perPerson*passengerCount*legs : service.fixed*legs;
  const transferType = tripType==="round_trip" ? "Round Trip Transfer" : "One Way Transfer";
  const direction = tripType==="round_trip" ? "Airport ⇄ Hotel" : (directionKey==="from_airport" ? "Airport → Hotel" : "Hotel → Airport");
  const arrivalLabel = directionKey==="to_airport" && tripType!=="round_trip" ? "Departure" : "Arrival";
  const arrivalValue = `${date} ${flightTime} · ${flight}`;
  const payment="Cash to driver (EUR / USD / TRY)";
  const noteValue=notes || "—";

  const rows=[];
  rows.push(["Booking ID",id]);
  rows.push(["Language",language]);
  rows.push(["Transfer Type",transferType]);
  rows.push(["Service",service.label]);
  rows.push(["Direction",direction]);
  rows.push(["Airport","Kayseri Airport (ASR)"]);
  rows.push(["Destination",destination]);
  rows.push([arrivalLabel,esc(arrivalValue)]);
  if(tripType==="round_trip"){
    rows.push(["Return",esc(`${returnDate} · ${returnFlight}`)]);
    rows.push(["Return Pickup Time","Arranged by company according to flight details"]);
  } else if(directionKey==="to_airport") {
    rows.push(["Pickup Time","Arranged by company according to flight details"]);
  }
  rows.push(["Hotel / Accommodation",esc(hotel)]);
  rows.push(["Passenger Count",String(passengerCount)]);
  rows.push(["Contact WhatsApp",contactWhatsApp]);
  passengers.forEach((p,i)=>rows.push([`Passenger ${i+1}`,`${esc(p.name)}<br>Passport: ${esc(p.passport)}`]));
  rows.push(["Total Price",`EUR ${total}`]);
  rows.push(["Payment",payment]);
  rows.push(["Notes",esc(noteValue)]);

  const html=`<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#172033;background:#fff"><div style="max-width:760px;margin:0 auto;padding:24px"><h2 style="margin:0 0 18px">Booking request.</h2><table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px">${rows.map(([a,b])=>row(a,b)).join("")}</table><p style="margin-top:18px;font-size:12px;line-height:1.5;color:#5d6678">Passenger passport information is included because it is required for the reservation. Handle this email securely and do not forward it unnecessarily.</p></div></body></html>`;
  const text=`Booking request.\n\n${rows.map(([a,b])=>plainLine(a,b)).join("\n")}\n\nPassenger passport information is included because it is required for the reservation. Handle this email securely and do not forward it unnecessarily.`;
  const whatsappMessage=`Booking request.\n\n${rows.map(([a,b])=>plainLine(a,b)).join("\n")}\n\nPlease confirm this transfer request.`;

  const apiKey=process.env.RESEND_API_KEY;
  const from=process.env.RESEND_FROM_EMAIL;
  const to=process.env.BOOKING_TO_EMAIL || "airportcappadociatransfer@gmail.com";
  if(!apiKey || !from){
    return res.status(500).json({error:"email_not_configured",bookingId:id,whatsappMessage,message:"Email delivery is not configured yet. WhatsApp will open so the request can still be sent."});
  }

  try{
    const rr=await fetch("https://api.resend.com/emails",{
      method:"POST",
      headers:{"Authorization":`Bearer ${apiKey}`,"Content-Type":"application/json"},
      body:JSON.stringify({from,to:[to],subject:`Booking request · ${id} · ${destination} · ${service.label}`,html,text})
    });
    if(!rr.ok){
      return res.status(502).json({error:"email_send_failed",bookingId:id,whatsappMessage,message:"Email delivery failed. WhatsApp will open so the request can still be sent."});
    }
    return res.status(200).json({ok:true,bookingId:id,totalPrice:`EUR ${total}`,whatsappMessage});
  }catch(err){
    return res.status(502).json({error:"email_send_failed",bookingId:id,whatsappMessage,message:"Email delivery failed. WhatsApp will open so the request can still be sent."});
  }
};
