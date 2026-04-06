function openModal(id) { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

function validateForm() {
    const g = document.getElementById('gcashNum').value;
    const a = document.getElementById('amountVal').value;
    const r = document.getElementById('refNum').value;
    const b1 = document.getElementById('bar1'), b2 = document.getElementById('bar2'), b3 = document.getElementById('bar3');
    const st = document.getElementById('stepText'), btn = document.getElementById('submitBtn');
    
    document.getElementById('amountGroup').classList.toggle('hidden', g.length < 11);
    document.getElementById('refGroup').classList.toggle('hidden', a.length < 3);
    
    b1.className = 'bar'; b2.className = 'bar'; b3.className = 'bar';
    
    if (r.length >= 10) {
        b1.classList.add('active-green'); b2.classList.add('active-green'); b3.classList.add('active-green');
        st.innerText = "3/3"; st.style.color = "#39FF14";
        btn.className = "btn-submit ready border-neon-green text-green-600 bg-green-50"; btn.innerText = "CONFIRM";
    } else if (a.length >= 2) {
        b1.classList.add('active-blue'); b2.classList.add('active-blue');
        st.innerText = "2/3"; st.style.color = "#00E5FF";
        btn.className = "btn-submit ready border-[#00E5FF] text-[#00B8D4] bg-cyan-50"; btn.innerText = "SUBMIT (OPTIONAL)";
    } else if (g.length > 0) {
        b1.classList.add('active-red');
        st.innerText = "1/3"; st.style.color = "#FF3D00";
        btn.className = "btn-submit border-[#FF3D00] text-[#FF3D00]"; btn.innerText = "INCOMPLETE";
    } else { 
        st.innerText = "0/3"; 
        btn.className = "btn-submit"; 
        btn.innerText = "SUBMIT"; 
    }
}

function confirmPayment() { alert("✅ Request Sent!"); closeModal('cashinModal'); }

// Dynamic Sky
const sky = document.getElementById('cebu-sky'), hr = new Date().getHours();
if (hr >= 18 || hr < 5) sky.style.background = "linear-gradient(180deg, #0B0E14 0%, #1A237E 100%)";
else if (hr >= 16 && hr < 18) sky.style.background = "linear-gradient(180deg, #E64A19 0%, #FFB74D 100%)";
