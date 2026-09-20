
(function(){
  const WA_NUMBER="905459320050";
  const localeMatch=location.pathname.match(/^\/(es|zh-cn|ko|ja|ru|it|de|pt|zh-tw|fr|th|id|ms-my)(?=\/|$)/);
  const locale=localeMatch ? localeMatch[1] : "en";
  const localePrefix=locale === "en" ? "" : `/${locale}`;
  const copy={
    en:{direct:"Hello, I have a question about a Kayseri Airport transfer.",booking:"Booking request",trip:"Trip type",service:"Transfer option",direction:"Direction",route:"Route",date:"Date",flight:"Flight",returnDate:"Return date",returnFlight:"Return flight",hotel:"Hotel",passengers:"Total passengers",payment:"Payment",cash:"Cash to the driver (EUR / USD / TRY)",passenger:"Passenger",name:"Name and surname",passport:"Passport number",notes:"Notes",confirm:"Please confirm this transfer request.",fullName:"FULL NAME",passportLabel:"PASSPORT NUMBER"},
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
      location.href=`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    });
  });

  const full=qs("#full-booking");
  if(full){
    const params=new URLSearchParams(location.search);
    ["trip_type","service","direction","destination","date","passengers"].forEach(k=>{
      const el=full.elements[k];
      if(el && params.get(k)) el.value=params.get(k);
    });
    const passengerCount=qs("#passengers",full);
    const passengerWrap=qs("#passenger-fields",full);
    function renderPassengers(){
      let n=Math.max(1,Math.min(16,parseInt(passengerCount.value||"1",10)));
      passengerWrap.innerHTML="";
      for(let i=1;i<=n;i++){
        passengerWrap.insertAdjacentHTML("beforeend",`
          <div class="passenger-block">
            <h3>${c.passenger} ${i}</h3>
            <div class="fields">
              <div class="field"><label>${c.fullName}</label><input name="passenger_name_${i}" required></div>
              <div class="field"><label>${c.passportLabel}</label><input name="passport_${i}" required></div>
            </div>
          </div>`);
      }
    }
    if(passengerCount && passengerWrap){
      passengerCount.addEventListener("change",renderPassengers);
      renderPassengers();
    }

    const tripType=qs("#trip-type",full);
    const returnFields=qs("#return-fields",full);
    function syncTripType(){
      const round=tripType && (tripType.value==="Round Trip" || tripType.value==="Ida y vuelta" || tripType.value==="往返");
      if(returnFields) returnFields.hidden=!round;
      ["return_date","return_flight"].forEach(name=>{ const el=full.elements[name]; if(el) el.required=!!round; });
    }
    if(tripType){ tripType.addEventListener("change",syncTripType); syncTripType(); }

    const continueBtn=qs("#continue-booking");
    const passengerStep=qs("#passenger-step");
    if(continueBtn && passengerStep){
      continueBtn.addEventListener("click",()=>{
        const requiredBefore=["trip_type","service","direction","destination","date","flight","hotel","passengers"];
        for(const name of requiredBefore){
          const el=full.elements[name];
          if(el && !el.checkValidity()){ el.reportValidity(); return; }
        }
        passengerStep.hidden=false;
        continueBtn.hidden=true;
        passengerStep.scrollIntoView({behavior:"smooth",block:"start"});
      });
    }

    full.addEventListener("submit",e=>{
      e.preventDefault();
      if(!full.reportValidity()) return;
      const d=new FormData(full);
      let text=`${c.booking}\n\n`;
      text+=`${c.trip}: ${d.get("trip_type")}\n`;
      text+=`${c.service}: ${d.get("service")}\n`;
      text+=`${c.direction}: ${d.get("direction")}\n`;
      text+=`${c.route}: Kayseri Airport (ASR) ↔ ${d.get("destination")}\n`;
      text+=`${c.date}: ${d.get("date")}\n`;
      text+=`${c.flight}: ${d.get("flight")}\n`;
      if(d.get("trip_type")==="Round Trip"){
        text+=`${c.returnDate}: ${d.get("return_date")}\n`;
        text+=`${c.returnFlight}: ${d.get("return_flight")}\n`;
      }
      text+=`${c.hotel}: ${d.get("hotel")}\n`;
      text+=`${c.passengers}: ${d.get("passengers")}\n`;
      text+=`${c.payment}: ${c.cash}\n\n`;
      for(let i=1;i<=parseInt(d.get("passengers"),10);i++){
        text+=`${c.passenger} ${i}\n${c.name}: ${d.get("passenger_name_"+i)}\n${c.passport}: ${d.get("passport_"+i)}\n\n`;
      }
      if(d.get("notes")) text+=`${c.notes}: ${d.get("notes")}\n\n`;
      text+=c.confirm;
      location.href=`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
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
