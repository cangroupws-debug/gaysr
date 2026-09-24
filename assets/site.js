
(function(){
  const WA_NUMBER="905459320050";
  const localeMatch=location.pathname.match(/^\/(es|zh-cn|ko|ja|ru|it|de|pt|zh-tw|fr|th|id|ms-my)(?=\/|$)/);
  const locale=localeMatch ? localeMatch[1] : "en";
  const localePrefix=locale === "en" ? "" : `/${locale}`;
  const copy={
    en:{direct:"Hello, I have a question about a Kayseri Airport transfer.",booking:"Booking request",trip:"Trip type",service:"Transfer option",direction:"Direction",route:"Route",date:"Date",flight:"Flight",returnDate:"Return date",returnFlight:"Return flight",hotel:"Hotel",passengers:"Total passengers",payment:"Payment",cash:"Cash to the driver (EUR / USD / TRY)",passenger:"Passenger",name:"Name and surname",passport:"Passport number",notes:"Notes",confirm:"Please confirm this transfer request.",fullName:"NAME SURNAME",passportLabel:"PASSPORT NUMBER"},
    es:{direct:"Hola, tengo una pregunta sobre un traslado desde el aeropuerto de Kayseri.",booking:"Solicitud de traslado",trip:"Tipo de viaje",service:"Tipo de traslado",direction:"Dirección",route:"Ruta",date:"Fecha",flight:"Vuelo",returnDate:"Fecha de regreso",returnFlight:"Vuelo de regreso",hotel:"Hotel",passengers:"Pasajeros totales",payment:"Pago",cash:"Pago en efectivo al conductor (EUR / USD / TRY)",passenger:"Pasajero",name:"Nombre y apellidos",passport:"Número de pasaporte",notes:"Notas",confirm:"Confirme esta solicitud de traslado.",fullName:"NOMBRE COMPLETO",passportLabel:"NÚMERO DE PASAPORTE"},
    "zh-cn":{direct:"您好，我想咨询开塞利机场接送服务。",booking:"接送申请",trip:"行程类型",service:"接送类型",direction:"接送方向",route:"路线",date:"日期",flight:"航班",returnDate:"返程日期",returnFlight:"返程航班",hotel:"酒店",passengers:"乘客总数",payment:"付款",cash:"向司机现金支付（EUR / USD / TRY）",passenger:"乘客",name:"姓名",passport:"护照号码",notes:"备注",confirm:"请确认这项接送申请。",fullName:"姓名",passportLabel:"护照号码"},
    ko:{direct:"안녕하세요. 카이세리 공항 픽업 서비스에 대해 문의드리고 싶습니다.",booking:"예약 요청",trip:"여행 유형",service:"이동 서비스",direction:"이동 방향",route:"경로",date:"날짜",flight:"항공편",returnDate:"귀국 날짜",returnFlight:"귀국 항공편",hotel:"호텔",passengers:"총 승객 수",payment:"결제",cash:"기사님께 현금 결제 (EUR / USD / TRY)",passenger:"승객",name:"성명",passport:"여권 번호",notes:"메모",confirm:"이 이동 서비스를 신청합니다.",fullName:"성명",passportLabel:"여권 번호"},
    ja:{direct:"こんにちは。カイセリ空港送迎について質問があります。",booking:"送迎リクエスト",trip:"旅行タイプ",service:"送迎タイプ",direction:"送迎方向",route:"ルート",date:"日付",flight:"便名",returnDate:"復路日",returnFlight:"復路便名",hotel:"ホテル",passengers:"乗車人数",payment:"支払い",cash:"ドライバーへの現金払い（EUR / USD / TRY）",passenger:"乗客",name:"氏名",passport:"パスポート番号",notes:"備考",confirm:"この送迎リクエストをご確認ください。",fullName:"氏名",passportLabel:"パスポート番号"},
    ru:{direct:"Здравствуйте! У меня есть вопрос о трансфере из аэропорта Кайсери.",booking:"Заявка на трансфер",trip:"Тип поездки",service:"Тип трансфера",direction:"Направление",route:"Маршрут",date:"Дата",flight:"Рейс",returnDate:"Дата обратной поездки",returnFlight:"Обратный рейс",hotel:"Отель",passengers:"Всего пассажиров",payment:"Оплата",cash:"Оплата наличными водителю (EUR / USD / TRY)",passenger:"Пассажир",name:"Имя и фамилия",passport:"Номер паспорта",notes:"Примечания",confirm:"Пожалуйста, подтвердите заявку на этот трансфер.",fullName:"ИМЯ И ФАМИЛИЯ",passportLabel:"НОМЕР ПАСПОРТА"},
    it:{direct:"Buongiorno, vorrei informazioni sul transfer dall'aeroporto di Kayseri.",booking:"Richiesta di transfer",trip:"Tipo di viaggio",service:"Tipo di transfer",direction:"Direzione",route:"Percorso",date:"Data",flight:"Volo",returnDate:"Data del ritorno",returnFlight:"Volo di ritorno",hotel:"Hotel",passengers:"Passeggeri totali",payment:"Pagamento",cash:"Pagamento in contanti all'autista (EUR / USD / TRY)",passenger:"Passeggero",name:"Nome e cognome",passport:"Numero di passaporto",notes:"Note",confirm:"Conferma questa richiesta di transfer.",fullName:"NOME E COGNOME",passportLabel:"NUMERO DI PASSAPORTO"},
    de:{direct:"Guten Tag, ich habe eine Frage zu einem Transfer vom Flughafen Kayseri.",booking:"Transferanfrage",trip:"Reiseart",service:"Transferart",direction:"Richtung",route:"Route",date:"Datum",flight:"Flug",returnDate:"Rückreisedatum",returnFlight:"Rückflug",hotel:"Hotel",passengers:"Passagiere insgesamt",payment:"Zahlung",cash:"Barzahlung beim Fahrer (EUR / USD / TRY)",passenger:"Passagier",name:"Vor- und Nachname",passport:"Reisepassnummer",notes:"Anmerkungen",confirm:"Bitte bestätigen Sie diese Transferanfrage.",fullName:"VOR- UND NACHNAME",passportLabel:"REISEPASSNUMMER"},
    pt:{direct:"Olá, tenho uma dúvida sobre um transfer do Aeroporto de Kayseri.",booking:"Pedido de transfer",trip:"Tipo de viagem",service:"Tipo de transfer",direction:"Direção",route:"Percurso",date:"Data",flight:"Voo",returnDate:"Data de regresso",returnFlight:"Voo de regresso",hotel:"Hotel",passengers:"Total de passageiros",payment:"Pagamento",cash:"Pagamento em dinheiro ao motorista (EUR / USD / TRY)",passenger:"Passageiro",name:"Nome completo",passport:"Número do passaporte",notes:"Notas",confirm:"Confirme este pedido de transfer.",fullName:"NOME COMPLETO",passportLabel:"NÚMERO DO PASSAPORTE"},
    "zh-tw":{direct:"您好，我想詢問開塞利機場接送服務。",booking:"接送申請",trip:"行程類型",service:"接送類型",direction:"接送方向",route:"路線",date:"日期",flight:"航班",returnDate:"回程日期",returnFlight:"回程航班",hotel:"飯店",passengers:"乘客總數",payment:"付款",cash:"向司機以現金支付（EUR / USD / TRY）",passenger:"乘客",name:"姓名",passport:"護照號碼",notes:"備註",confirm:"請確認這項接送申請。",fullName:"姓名",passportLabel:"護照號碼"},
    fr:{direct:"Bonjour, j’ai une question concernant un transfert depuis l’aéroport de Kayseri.",booking:"Demande de transfert",trip:"Type de trajet",service:"Type de transfert",direction:"Sens du transfert",route:"Itinéraire",date:"Date",flight:"Vol",returnDate:"Date du retour",returnFlight:"Vol retour",hotel:"Hôtel",passengers:"Nombre total de passagers",payment:"Paiement",cash:"Paiement en espèces au chauffeur (EUR / USD / TRY)",passenger:"Passager",name:"Nom et prénom",passport:"Numéro de passeport",notes:"Remarques",confirm:"Veuillez confirmer cette demande de transfert.",fullName:"NOM ET PRÉNOM",passportLabel:"NUMÉRO DE PASSEPORT"},
    th:{direct:"สวัสดี มีคำถามเกี่ยวกับบริการรับส่งจากสนามบินเคย์เซรี",booking:"คำขอใช้บริการรถรับส่ง",trip:"ประเภทการเดินทาง",service:"ประเภทรถรับส่ง",direction:"ทิศทางการเดินทาง",route:"เส้นทาง",date:"วันที่",flight:"เที่ยวบิน",returnDate:"วันที่เดินทางกลับ",returnFlight:"เที่ยวบินขากลับ",hotel:"โรงแรม",passengers:"จำนวนผู้โดยสารทั้งหมด",payment:"การชำระเงิน",cash:"ชำระเงินสดให้คนขับ (EUR / USD / TRY)",passenger:"ผู้โดยสาร",name:"ชื่อและนามสกุล",passport:"หมายเลขหนังสือเดินทาง",notes:"หมายเหตุ",confirm:"กรุณายืนยันคำขอใช้บริการรถรับส่งนี้",fullName:"ชื่อและนามสกุล",passportLabel:"หมายเลขหนังสือเดินทาง"},
    id:{direct:"Halo, saya ingin menanyakan layanan transfer dari Bandara Kayseri.",booking:"Permintaan transfer",trip:"Jenis perjalanan",service:"Jenis transfer",direction:"Arah perjalanan",route:"Rute",date:"Tanggal",flight:"Penerbangan",returnDate:"Tanggal pulang",returnFlight:"Penerbangan pulang",hotel:"Hotel",passengers:"Jumlah penumpang",payment:"Pembayaran",cash:"Pembayaran tunai kepada pengemudi (EUR / USD / TRY)",passenger:"Penumpang",name:"Nama lengkap",passport:"Nomor paspor",notes:"Catatan",confirm:"Mohon konfirmasi permintaan transfer ini.",fullName:"NAMA LENGKAP",passportLabel:"NOMOR PASPOR"},
    "ms-my":{direct:"Hai, saya ada pertanyaan tentang transfer dari Lapangan Terbang Kayseri.",booking:"Permintaan transfer",trip:"Jenis perjalanan",service:"Jenis transfer",direction:"Arah perjalanan",route:"Laluan",date:"Tarikh",flight:"Penerbangan",returnDate:"Tarikh pulang",returnFlight:"Penerbangan pulang",hotel:"Hotel",passengers:"Jumlah penumpang",payment:"Pembayaran",cash:"Bayaran tunai kepada pemandu (EUR / USD / TRY)",passenger:"Penumpang",name:"Nama penuh",passport:"Nombor pasport",notes:"Catatan",confirm:"Sila sahkan permintaan transfer ini.",fullName:"NAMA PENUH",passportLabel:"NOMBOR PASPORT"}
  };
  const c=copy[locale] || copy.en;
  if(!document.getElementById("booking-hidden-fix")){
    const st=document.createElement("style");
    st.id="booking-hidden-fix";
    st.textContent='[hidden]{display:none !important;}';
    document.head.appendChild(st);
  }

  const sameDayReturnCopy={
    en:"Return transfer is on the same day as the first transfer. Please check the dates.",
    es:"El traslado de regreso es el mismo día que el primer traslado. Compruebe las fechas.",
    "zh-cn":"返程接送与去程接送在同一天，请检查日期。",
    ko:"귀국 이동이 첫 이동과 같은 날입니다. 날짜를 확인해 주세요.",
    ja:"復路送迎が往路送迎と同じ日です。日付をご確認ください。",
    ru:"Обратный трансфер назначен на тот же день, что и первый. Проверьте даты.",
    it:"Il transfer di ritorno è lo stesso giorno del primo transfer. Controlla le date.",
    de:"Der Rücktransfer findet am selben Tag wie der erste Transfer statt. Bitte prüfen Sie die Daten.",
    pt:"O transfer de regresso é no mesmo dia do primeiro transfer. Verifique as datas.",
    "zh-tw":"回程接送與去程接送在同一天，請檢查日期。",
    fr:"Le transfert retour est prévu le même jour que le premier transfert. Vérifiez les dates.",
    th:"รถรับส่งขากลับเป็นวันเดียวกับรถรับส่งเที่ยวแรก กรุณาตรวจสอบวันที่",
    id:"Transfer pulang berada pada hari yang sama dengan transfer pertama. Periksa kembali tanggalnya.",
    "ms-my":"Transfer pulang adalah pada hari yang sama dengan transfer pertama. Sila semak tarikhnya."
  };
  const sameDayReturnWarning=sameDayReturnCopy[locale] || sameDayReturnCopy.en;

  const pickupTimeCopy={
    en:{title:"HOTEL PICKUP TIME",text:"Your hotel pickup time will be arranged according to your flight code and confirmed with you."},
    es:{title:"HORA DE RECOGIDA EN EL HOTEL",text:"La hora de recogida en su hotel se organizará según su código de vuelo y se le confirmará."},
    "zh-cn":{title:"酒店接车时间",text:"酒店接车时间将根据您的航班号安排，并另行通知您。"},
    ko:{title:"호텔 픽업 시간",text:"호텔 픽업 시간은 항공편 번호에 따라 조정한 후 안내해 드립니다."},
    ja:{title:"ホテルお迎え時間",text:"ホテルのお迎え時間は便名に合わせて調整し、後ほどご案内します。"},
    ru:{title:"ВРЕМЯ ВЫЕЗДА ИЗ ОТЕЛЯ",text:"Время выезда из отеля будет рассчитано по номеру рейса и подтверждено вам."},
    it:{title:"ORARIO DI PRELIEVO IN HOTEL",text:"L’orario di prelievo in hotel sarà organizzato in base al codice del volo e vi verrà comunicato."},
    de:{title:"ABHOLZEIT AM HOTEL",text:"Ihre Abholzeit am Hotel wird anhand Ihrer Flugnummer geplant und Ihnen bestätigt."},
    pt:{title:"HORA DE RECOLHA NO HOTEL",text:"A hora de recolha no hotel será definida de acordo com o número do voo e comunicada a si."},
    "zh-tw":{title:"飯店接送時間",text:"飯店接送時間將依您的航班號安排，並另行通知您。"},
    fr:{title:"HEURE DE PRISE EN CHARGE À L’HÔTEL",text:"L’heure de prise en charge à votre hôtel sera organisée selon votre numéro de vol et vous sera confirmée."},
    th:{title:"เวลารับที่โรงแรม",text:"เวลารับจากโรงแรมจะจัดตามรหัสเที่ยวบินของคุณ และจะแจ้งยืนยันให้ทราบ"},
    id:{title:"WAKTU PENJEMPUTAN HOTEL",text:"Waktu penjemputan di hotel akan diatur berdasarkan kode penerbangan Anda dan dikonfirmasi kepada Anda."},
    "ms-my":{title:"WAKTU JEMPUTAN HOTEL",text:"Waktu jemputan di hotel akan diatur berdasarkan kod penerbangan anda dan dimaklumkan kepada anda."}
  };
  const pickupCopy=pickupTimeCopy[locale] || pickupTimeCopy.en;
  function qs(sel,root=document){return root.querySelector(sel)}
  function qsa(sel,root=document){return [...root.querySelectorAll(sel)]}

  const menuBtn=qs(".menu");
  const navLinks=qs(".navlinks");
  if(menuBtn && navLinks){
    menuBtn.addEventListener("click",()=>{
      navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", navLinks.classList.contains("open") ? "true" : "false");
    });
  }

  qsa(".quick-form").forEach(form=>{
    form.addEventListener("submit",e=>{
      e.preventDefault();
      const data=new FormData(form);
      const p=new URLSearchParams();
      ["trip_type","service","direction","destination","date","passengers"].forEach(k=>{ if(data.get(k)) p.set(k,data.get(k)); });
      location.href=`${localePrefix}/booking/?${p.toString()}`;
    });
  });

  function showWhatsAppFallback(form,url){
    let wrap=form.querySelector(".whatsapp-popup-fallback");
    if(!wrap){
      wrap=document.createElement("div");
      wrap.className="whatsapp-popup-fallback";
      wrap.setAttribute("role","status");
      wrap.style.cssText="margin-top:12px;text-align:center";
      const link=document.createElement("a");
      link.className="primary";
      link.target="_blank";
      link.rel="noopener";
      link.textContent="WhatsApp ↗";
      link.style.cssText="display:inline-block;text-decoration:none";
      wrap.appendChild(link);
      form.appendChild(wrap);
    }
    const link=wrap.querySelector("a");
    link.href=url;
    wrap.hidden=false;
    link.focus();
    return link;
  }

  function prepareWhatsAppTab(){
    const tab=window.open("about:blank","_blank");
    if(!tab) return null;
    try{
      tab.document.title="WhatsApp";
      tab.opener=null;
    }catch(_err){}
    return tab;
  }

  function sendWhatsAppToNewTab(tab,url,form){
    if(tab && !tab.closed){
      try{
        tab.location.replace(url);
        return true;
      }catch(_err){}
    }
    showWhatsAppFallback(form,url);
    return false;
  }

  // The compact booking page uses a static form without the progressive passenger step.
  // Keep that form functional and send its localized values to the same WhatsApp team.
  qsa(".full-booking form").filter(form=>!form.closest("#full-booking")).forEach(form=>{
    form.addEventListener("submit",e=>{
      e.preventDefault();
      const rows=[];
      form.querySelectorAll("select,input").forEach(el=>{
        if(!el.value) return;
        const label=el.closest(".field")?.querySelector("label")?.textContent?.trim();
        if(label) rows.push(`${label}: ${el.value}`);
      });
      const text=`${c.booking}\n\n${rows.join("\n")}\n\n${c.confirm}`;
      const whatsappUrl=`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
      const whatsappTab=prepareWhatsAppTab();
      sendWhatsAppToNewTab(whatsappTab,whatsappUrl,form);
    });
  });

  const full=qs("#full-booking");
  if(full){
    const params=new URLSearchParams(location.search);
    const passengerCount=qs("#passengers",full);
    const passengerWrap=qs("#passenger-fields",full);
    const tripType=qs("#trip-type",full);
    const direction=full.elements.direction;
    const returnFields=qs("#return-fields",full);
    const transferDateInput=full?.elements?.["date"] || null;
    const returnDateInput=full?.elements?.["return_date"] || null;
    let sameDayReturnEl=null;
    if(returnDateInput){
      sameDayReturnEl=document.createElement("div");
      sameDayReturnEl.className="same-day-return-warning";
      sameDayReturnEl.setAttribute("role","alert");
      sameDayReturnEl.hidden=true;
      sameDayReturnEl.textContent=sameDayReturnWarning;
      sameDayReturnEl.style.cssText="margin-top:6px;color:#c62828;font-size:.88rem;font-weight:700;line-height:1.35;";
      returnDateInput.insertAdjacentElement("afterend",sameDayReturnEl);
    }

    const flightTimeInput=full.elements.flight_time;
    const flightTimeField=flightTimeInput ? flightTimeInput.closest(".field") : null;
    const pickupTimeNotice=document.createElement("div");
    pickupTimeNotice.className="field full";
    pickupTimeNotice.hidden=true;
    pickupTimeNotice.style.display="none";
    pickupTimeNotice.innerHTML=`<label>${pickupCopy.title}</label><div style="padding:12px 14px;border:1px solid #d9e0e6;border-radius:10px;background:#f7f9fc;color:#596572;font-size:13px;line-height:1.5">${pickupCopy.text}</div>`;
    if(flightTimeField) flightTimeField.insertAdjacentElement("afterend",pickupTimeNotice);
    const submitBtn=full.querySelector('button[type="submit"]');
    const submitLabel=submitBtn ? submitBtn.textContent : "";

    function setSelectByTextOrValue(el,value){
      if(!el || !value) return;
      const decoded=String(value).replace(/\+/g," ").trim().toLowerCase();
      const exact=[...el.options].find(o=>String(o.value).toLowerCase()===decoded || o.textContent.trim().toLowerCase()===decoded);
      if(exact){ el.value=exact.value; return; }
      if(el.name==="service"){
        if(decoded.includes("15") || decoded.includes("shared") || decoded.includes("shuttle")) el.value="shared";
        else if(decoded.includes("vito") || decoded.includes("90")) el.value="vito";
        else if(decoded.includes("sprinter") || decoded.includes("110")) el.value="sprinter";
      } else if(el.name==="direction"){
        if(decoded.includes("to kayseri")) el.value="to_airport";
        else if(decoded.includes("from kayseri")) el.value="from_airport";
      } else if(el.name==="trip_type"){
        const roundWords=["round","vuelta","retour","rück","ritorno","regresso","туда","往返","왕복","ไป-กลับ","pulang","balik"];
        el.value=roundWords.some(w=>decoded.includes(w)) ? "Round Trip" : "One Way";
      }
    }
    ["trip_type","service","direction","destination","date","passengers"].forEach(k=>{
      const el=full.elements[k], value=params.get(k);
      if(!el || !value) return;
      if(el.tagName==="SELECT") setSelectByTextOrValue(el,value); else el.value=value;
    });

    function renderPassengers(){
      let n=Math.max(1,Math.min(16,parseInt(passengerCount.value||"1",10)));
      passengerWrap.innerHTML="";
      for(let i=1;i<=n;i++){
        passengerWrap.insertAdjacentHTML("beforeend",`
          <div class="passenger-block">
            <h3>${c.passenger} ${i}</h3>
            <div class="fields">
              <div class="field"><label for="passenger-name-${i}">${c.fullName}</label><input id="passenger-name-${i}" name="passenger_name_${i}" maxlength="100" autocomplete="name" required></div>
              <div class="field"><label for="passenger-passport-${i}">${c.passportLabel}</label><input id="passenger-passport-${i}" name="passport_${i}" maxlength="50" autocomplete="off"></div>
            </div>
          </div>`);
      }
    }
    if(passengerCount && passengerWrap){
      passengerCount.addEventListener("change",renderPassengers);
      renderPassengers();
    }

    function syncDirection(){
      const hotelToAirport=tripType?.value!=="Round Trip" && direction?.value==="to_airport";

      if(flightTimeField){
        flightTimeField.hidden=hotelToAirport;
        flightTimeField.style.display=hotelToAirport ? "none" : "";
      }
      if(flightTimeInput){
        flightTimeInput.required=!hotelToAirport;
        if(hotelToAirport) flightTimeInput.value="";
      }

      pickupTimeNotice.hidden=!hotelToAirport;
      pickupTimeNotice.style.display=hotelToAirport ? "" : "none";
    }

    function syncReturnDate(){
      if(!transferDateInput || !returnDateInput) return true;

      const outbound=transferDateInput.value || "";
      const ret=returnDateInput.value || "";

      if(outbound){
        // Native date pickers will disable every date before the transfer date.
        returnDateInput.min=outbound;

        // If the transfer date is moved forward after a return date was already chosen,
        // remove the now-invalid return date instead of leaving an impossible selection.
        if(ret && ret < outbound){
          returnDateInput.value="";
          returnDateInput.setCustomValidity("");
          if(sameDayReturnEl) sameDayReturnEl.hidden=true;
          return true;
        }
      }else{
        returnDateInput.removeAttribute("min");
      }

      returnDateInput.setCustomValidity("");
      if(sameDayReturnEl) sameDayReturnEl.hidden=true;

      const currentReturn=returnDateInput.value || "";
      if(!outbound || !currentReturn) return true;

      if(currentReturn === outbound){
        if(sameDayReturnEl){
          sameDayReturnEl.textContent=sameDayReturnWarning;
          sameDayReturnEl.hidden=false;
        }
      }

      return true;
    }

    function syncTripType(){
      const round=tripType && tripType.value==="Round Trip";

      if(returnFields){
        returnFields.hidden=!round;
        returnFields.style.display=round ? "" : "none";
      }

      ["return_date","return_flight"].forEach(name=>{
        const el=full.elements[name];
        if(el){
          el.required=!!round;
          if(!round) el.value="";
        }
      });

      syncDirection();
      syncReturnDate();
    }
    if(direction) direction.addEventListener("change",syncDirection);
    if(tripType){ tripType.addEventListener("change",syncTripType); syncTripType(); }
    else syncDirection();

    const continueBtn=qs("#continue-booking");
    const passengerStep=qs("#passenger-step");
    if(continueBtn && passengerStep){
      continueBtn.addEventListener("click",()=>{
        const requiredBefore=["trip_type","service","direction","destination","date","flight","hotel","passengers","contact_whatsapp"];
        const hotelToAirport=tripType?.value!=="Round Trip" && direction?.value==="to_airport";
        if(!hotelToAirport) requiredBefore.splice(6,0,"flight_time");
        for(const name of requiredBefore){
          const el=full.elements[name];
          if(el && !el.checkValidity()){ el.reportValidity(); return; }
        }
        const pax=parseInt(full.elements.passengers.value||"1",10);
        if(full.elements.service.value==="vito" && pax>5){
          full.elements.passengers.setCustomValidity("Private Vito is available for up to 5 passengers.");
          full.elements.passengers.reportValidity();
          full.elements.passengers.setCustomValidity("");
          return;
        }
        passengerStep.hidden=false;
        continueBtn.hidden=true;
        passengerStep.scrollIntoView({behavior:"smooth",block:"start"});
      });
    }

    function freshBookingId(){
      const parts=new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Istanbul",month:"2-digit",day:"2-digit"}).formatToParts(new Date());
      const mm=parts.find(p=>p.type==="month")?.value || "00";
      const dd=parts.find(p=>p.type==="day")?.value || "00";
      const chars="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      const rnd=new Uint32Array(4);
      if(window.crypto?.getRandomValues) window.crypto.getRandomValues(rnd);
      else for(let i=0;i<4;i++) rnd[i]=Math.floor(Math.random()*0xffffffff);
      let suffix="";
      for(let i=0;i<4;i++) suffix+=chars[rnd[i]%chars.length];
      return `KAT-${mm}${dd}-${suffix}`;
    }

    function selectedText(name){
      const el=full.elements[name];
      if(!el) return "";
      if(el.tagName==="SELECT") return el.selectedOptions?.[0]?.textContent?.trim() || el.value || "";
      return el.value || "";
    }

    function emergencyWhatsAppMessage(payload){
      const lines=["Booking request",`Booking ID: ${payload.bookingId}`];
      lines.push(`${c.trip}: ${selectedText("trip_type")}`);
      lines.push(`${c.service}: ${selectedText("service")}`);
      lines.push(`${c.direction}: ${selectedText("direction")}`);
      lines.push(`${c.route}: ${selectedText("destination")}`);
      lines.push(`${c.date}: ${payload.date}`);
      lines.push(`${c.flight}: ${payload.flight}${payload.flightTime ? " · "+payload.flightTime : ""}`);
      if(payload.tripType==="round_trip"){
        lines.push(`${c.returnDate}: ${payload.returnDate}`);
        lines.push(`${c.returnFlight}: ${payload.returnFlight}`);
      }
      lines.push(`${c.hotel}: ${payload.hotel}`);
      lines.push(`${c.passengers}: ${payload.passengerCount}`);
      if(payload.contactWhatsApp) lines.push(`WhatsApp: ${payload.contactWhatsApp}`);
      payload.passengers.forEach((p,i)=>{
        lines.push("");
        lines.push(`${c.passenger} ${i+1}`);
        lines.push(`${c.name}: ${p.name}`);
        lines.push(`${c.passport}: ${p.passport || "—"}`);
      });
      lines.push("");
      lines.push(`${c.payment}: ${c.cash}`);
      if(payload.notes) lines.push(`${c.notes}: ${payload.notes}`);
      lines.push("");
      lines.push(c.confirm);
      return lines.join("\n");
    }

    if(transferDateInput) transferDateInput.addEventListener("change",syncReturnDate);
    if(returnDateInput) returnDateInput.addEventListener("change",syncReturnDate);
    syncReturnDate();

    function bookingPayload(){
      const d=new FormData(full);
      const count=Math.max(1,Math.min(16,parseInt(d.get("passengers")||"1",10)));
      const passengers=[];
      for(let i=1;i<=count;i++) passengers.push({name:d.get("passenger_name_"+i)||"",passport:d.get("passport_"+i)||""});
      return {
        bookingId:freshBookingId(),
        language:locale,
        tripType:d.get("trip_type")==="Round Trip" ? "round_trip" : "one_way",
        service:d.get("service"),
        direction:d.get("direction"),
        destination:d.get("destination"),
        date:d.get("date"),
        flight:d.get("flight"),
        flightTime:d.get("flight_time"),
        returnDate:d.get("return_date")||"",
        returnFlight:d.get("return_flight")||"",
        hotel:d.get("hotel"),
        passengerCount:count,
        contactWhatsApp:d.get("contact_whatsapp"),
        notes:d.get("notes")||"",
        passengers,
        website:""
      };
    }

    full.addEventListener("submit",async e=>{
      e.preventDefault();
      if(!full.reportValidity()) return;
      if(!syncReturnDate()){
        if(returnDateInput){
          returnDateInput.reportValidity();
          returnDateInput.focus();
        }
        return;
      }
      const payload=bookingPayload();
      if(payload.service==="vito" && payload.passengerCount>5){
        full.elements.passengers.setCustomValidity("Private Vito is available for up to 5 passengers.");
        full.elements.passengers.reportValidity();
        full.elements.passengers.setCustomValidity("");
        return;
      }
      const whatsappTab=prepareWhatsAppTab();

      if(submitBtn){
        submitBtn.disabled=true;
        submitBtn.dataset.originalLabel=submitLabel;
        submitBtn.textContent=submitLabel.replace(/\s*[→›]\s*$/,'')+"…";
      }

      const fallbackMessage=emergencyWhatsAppMessage(payload);
      let whatsappMessage=fallbackMessage;

      try{
        const response=await fetch("/api/booking",{
          method:"POST",
          headers:{"Content-Type":"application/json","Accept":"application/json"},
          body:JSON.stringify(payload)
        });
        const result=await response.json().catch(()=>({}));
        console.info("BOOKING_API_RESULT",{
          status:response.status,
          ok:response.ok,
          build:result.build || null,
          emailStatus:result.emailStatus || null,
          fields:result.fields || null
        });
        if(typeof result.whatsappMessage==="string" && result.whatsappMessage.trim()){
          whatsappMessage=result.whatsappMessage;
        }
      }catch(err){
        console.warn("Booking API unavailable; using WhatsApp fallback.");
      }finally{
        if(submitBtn){
          submitBtn.disabled=false;
          submitBtn.textContent=submitLabel;
        }
      }

      const whatsappUrl=`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
      sendWhatsAppToNewTab(whatsappTab,whatsappUrl,full);
    });

    // When the customer returns from WhatsApp with the browser Back button,
    // the next submit always creates a fresh server-side KAT-MMDD-XXXX ID.
    window.addEventListener("pageshow",()=>{
      if(submitBtn){ submitBtn.disabled=false; submitBtn.textContent=submitLabel; }
    });
  }

  qsa("[data-wa]").forEach(a=>a.href=`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(c.direct)}`);
})();

// Language menu: preserve the current page while switching locale.
(function(){
  const langs=[
    ["English","/"],["Español","/es/"],["简体中文","/zh-cn/"],["한국어","/ko/"],["日本語","/ja/"],["Русский","/ru/"],["Italiano","/it/"],["Deutsch","/de/"],["Português","/pt/"],["繁體中文","/zh-tw/"],["Français","/fr/"],["ไทย","/th/"],["Bahasa Indonesia","/id/"],["Bahasa Melayu","/ms-my/"]
  ];
  const btn=document.querySelector('.lang'); if(!btn) return;
  btn.addEventListener('click',function(e){
    e.preventDefault(); e.stopPropagation();
    let pop=document.querySelector('.language-popover');
    if(pop){ pop.remove(); return; }
    pop=document.createElement('div'); pop.className='language-popover';
    const path=location.pathname.replace(/^\/(es|zh-cn|ko|ja|ru|it|de|pt|zh-tw|fr|th|id|ms-my)(?=\/|$)/,'') || '/';
    langs.forEach(([name,base])=>{ const a=document.createElement('a'); a.textContent=name; a.href=base==='/'?path:(base.replace(/\/$/,'')+path); pop.appendChild(a); });
    btn.parentElement.appendChild(pop);
  });
  document.addEventListener('click',()=>{ const p=document.querySelector('.language-popover'); if(p) p.remove(); });
})();
