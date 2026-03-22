/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { 
  ArrowRight, 
  Check, 
  Shield, 
  Clock, 
  Zap, 
  Target, 
  Layout, 
  Search, 
  FileText, 
  Image as ImageIcon, 
  ChevronDown,
  Star,
  Users,
  Mail,
  MessageSquare
} from 'lucide-react';

export default function App() {
  const [countdown, setCountdown] = useState({ h: '08', m: '43', s: '27' });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Countdown logic
  useEffect(() => {
    const target = new Date();
    target.setHours(23, 59, 59, 999);

    const timer = setInterval(() => {
      const diff = target.getTime() - new Date().getTime();
      if (diff <= 0) {
        setCountdown({ h: '00', m: '00', s: '00' });
        clearInterval(timer);
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown({
        h: h.toString().padStart(2, '0'),
        m: m.toString().padStart(2, '0'),
        s: s.toString().padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Reveal on scroll logic
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12 });

    revealRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#080810] text-white/70 font-sans selection:bg-[#e8512a] selection:text-white">
      <motion.div id="progress" style={{ scaleX, transformOrigin: "0%" }} />

      {/* ══ TOP BAR ══ */}
      <header className="topbar">
        <div className="topbar-logo">Claude <span>Co-work</span> Mastery</div>
        <div className="topbar-cta">
          <span className="topbar-price hidden md:inline">🔥 Ưu đãi kết thúc hôm nay</span>
          <a href="#pricing" className="btn-topbar">Mua Ngay →</a>
        </div>
      </header>

      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hero-grid-bg" />
        <div className="hero-noise" />
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <div className="eyebrow-line" />
              <span className="eyebrow-text">Hướng Dẫn Toàn Diện · 2025</span>
            </div>
            <h1 className="text-white font-serif font-bold leading-[1.06] mb-2">
              Biến Claude<br />Thành <span className="accent italic text-[#e8512a]">Nhân Viên</span><br /><span className="accent-gold bg-gradient-to-br from-[#d4a843] to-[#f0c866] bg-clip-text text-transparent">AI 24/7</span>
            </h1>
            <p className="hero-sub text-lg font-light text-white/70 my-6 leading-relaxed max-w-[480px]">
              90% người dùng Claude chỉ đang khai thác <strong className="text-white font-semibold">10% sức mạnh</strong> thực sự. eBook này trao cho bạn hệ thống hoàn chỉnh để Claude tự động làm việc — ngay cả khi bạn đang ngủ.
            </p>
            <div className="hero-actions flex flex-col gap-4">
              <a href="#pricing" className="btn-primary group">
                Tải eBook Ngay — Chỉ 299.000₫
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <div className="hero-guarantee flex items-center gap-2 text-xs text-white/35">
                <Shield className="w-4 h-4" />
                Bảo đảm hoàn tiền 30 ngày nếu không hài lòng
              </div>
            </div>
          </div>

          <div className="hero-visual reveal" ref={addToRefs}>
            <div className="hero-mockup">
              <div className="mockup-bar">
                <span className="dot dot-r" />
                <span className="dot dot-y" />
                <span className="dot dot-g" />
                <span className="mockup-title">Claude Co-work — Dự án: Marketing</span>
              </div>
              <div className="mockup-body">
                <div className="mockup-row">
                  <div className="mockup-avatar avatar-user">👤</div>
                  <div className="mockup-bubble bubble-user">morning briefing</div>
                </div>
                <div className="mockup-row">
                  <div className="mockup-avatar avatar-bot">🤖</div>
                  <div className="mockup-bubble bubble-bot">
                    ☀️ <span className="mockup-highlight text-[#ff7347] font-semibold">Chào buổi sáng!</span> Đây là tóm tắt ngày của bạn:<br /><br />
                    📅 <strong className="text-white">3 cuộc họp</strong> hôm nay (10:00, 14:00, 16:30)<br />
                    📧 <strong className="text-white">7 email khẩn</strong> chờ phản hồi<br />
                    🎯 Ưu tiên số 1: Hoàn thiện deck Q2...
                  </div>
                </div>
                <div className="mockup-row">
                  <div className="mockup-avatar avatar-user">👤</div>
                  <div className="mockup-bubble bubble-user">research assistant Claude Skills 2.0</div>
                </div>
                <div className="mockup-row">
                  <div className="mockup-avatar avatar-bot">🤖</div>
                  <div className="mockup-bubble bubble-bot">
                    <div className="typing-dots"><span></span><span></span><span></span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-stats-row">
              <div className="hero-stat">
                <div className="hero-stat-n">4</div>
                <div className="hero-stat-l">Siêu năng lực</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-n">7</div>
                <div className="hero-stat-l">Skills thiết yếu</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-n">24/7</div>
                <div className="hero-stat-l">Tự động hóa</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SOCIAL PROOF BAR ══ */}
      <div className="proof-bar">
        <div className="proof-track">
          {[
            { name: "Minh Tuấn", text: "Tiết kiệm 3 giờ mỗi ngày" },
            { name: "Lan Anh", text: "Morning brief tự động thay đổi hoàn toàn buổi sáng của tôi" },
            { name: "Thành Đạt", text: "Từ 10% lên 90% chỉ sau 1 tuần" },
            { name: "Ngọc Hà", text: "Scheduled tasks chạy lúc 7am, tôi thức dậy đã có tất cả" },
            { name: "Hùng Việt", text: "Skill deck generator thay thế hoàn toàn Canva với tôi" },
            { name: "Mai Linh", text: "Co-work + Zapier MCP kết nối được tất cả apps tôi cần" }
          ].map((item, i) => (
            <div key={i} className="proof-item">
              <span className="proof-dot" />
              <strong className="text-white font-semibold">{item.name}</strong> — "{item.text}"
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {[
            { name: "Minh Tuấn", text: "Tiết kiệm 3 giờ mỗi ngày" },
            { name: "Lan Anh", text: "Morning brief tự động thay đổi hoàn toàn buổi sáng của tôi" },
            { name: "Thành Đạt", text: "Từ 10% lên 90% chỉ sau 1 tuần" },
            { name: "Ngọc Hà", text: "Scheduled tasks chạy lúc 7am, tôi thức dậy đã có tất cả" },
            { name: "Hùng Việt", text: "Skill deck generator thay thế hoàn toàn Canva với tôi" },
            { name: "Mai Linh", text: "Co-work + Zapier MCP kết nối được tất cả apps tôi cần" }
          ].map((item, i) => (
            <div key={`dup-${i}`} className="proof-item">
              <span className="proof-dot" />
              <strong className="text-white font-semibold">{item.name}</strong> — "{item.text}"
            </div>
          ))}
        </div>
      </div>

      {/* ══ PROBLEM ══ */}
      <section className="problem">
        <div className="wrap">
          <div className="sec-head reveal" ref={addToRefs}>
            <div className="tag-pill tag-flame">Vấn đề</div>
            <h2 className="text-white font-serif font-bold text-4xl md:text-5xl leading-tight mb-4">Bạn Đang Lãng Phí<br /><em className="italic text-[#e8512a]">90% Sức Mạnh Claude</em></h2>
            <p className="text-white/70 text-lg max-w-[560px] mx-auto leading-relaxed">Mỗi ngày bạn mở Claude, gõ câu hỏi, đóng ứng dụng rồi lặp lại từ đầu vào ngày hôm sau. Đó không phải cách sử dụng AI — đó là cách lãng phí AI.</p>
          </div>

          <div className="problem-grid">
            <div className="problem-list">
              {[
                { icon: <Clock className="w-4 h-4" />, title: "Giải thích lại mọi thứ mỗi ngày", desc: "Claude không nhớ bạn là ai, doanh nghiệp bạn làm gì, hay phong cách bạn muốn. Mỗi phiên là một tờ giấy trắng." },
                { icon: <FileText className="w-4 h-4" />, title: "Prompt dài, kết quả ngắn", desc: "Bạn viết prompt cả đoạn nhưng Claude vẫn cho ra kết quả generic không đúng ý. Vì thiếu hệ thống — không phải vì Claude kém." },
                { icon: <Layout className="w-4 h-4" />, title: "Apps sống trong các đảo riêng biệt", desc: "Email ở một chỗ, lịch một chỗ, Slack một chỗ. Claude không thể đọc chúng — bạn phải copy-paste thủ công mãi mãi." },
                { icon: <Zap className="w-4 h-4" />, title: "Claude chỉ làm việc khi bạn ngồi đó", desc: "Không có bạn = không có gì được làm. Trong khi đó, đối thủ đã tự động hóa quy trình và đang chạy 24/7." }
              ].map((item, i) => (
                <div key={i} className={`problem-item reveal reveal-delay-${i + 1}`} ref={addToRefs}>
                  <div className="problem-icon">{item.icon}</div>
                  <div className="problem-text">
                    <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                    <p className="text-white/35 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="problem-visual reveal" ref={addToRefs}>
              <div className="loss-card">
                <div className="loss-title">💸 Bạn đang lãng phí mỗi tuần</div>
                <div className="loss-row">
                  <span className="loss-label">Thời gian giải thích lại cho Claude</span>
                  <span className="loss-val red">~45 phút</span>
                </div>
                <div className="loss-row">
                  <span className="loss-label">Copy-paste giữa các ứng dụng</span>
                  <span className="loss-val red">~2 giờ</span>
                </div>
                <div className="loss-row">
                  <span className="loss-label">Làm thủ công việc AI có thể tự làm</span>
                  <span className="loss-val red">~5 giờ</span>
                </div>
                <div className="loss-row">
                  <span className="loss-label">Tạo báo cáo, tóm tắt, slide</span>
                  <span className="loss-val red">~3 giờ</span>
                </div>
                <div className="loss-total">
                  <span className="loss-total-label">Tổng thời gian lãng phí / tuần</span>
                  <span className="loss-total-num">~11 giờ</span>
                </div>
                <div className="mt-4 p-4 bg-[#4ecb71]/5 border border-[#4ecb71]/15 rounded-lg">
                  <div className="text-xs text-[#4ecb71] font-bold mb-1">✓ Với Co-work đúng cách:</div>
                  <div className="text-xs text-white/35">Toàn bộ 11 giờ đó được thu hồi — mỗi tuần, mãi mãi.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHAT YOU GET ══ */}
      <section className="features">
        <div className="wrap">
          <div className="sec-head reveal" ref={addToRefs}>
            <div className="tag-pill tag-gold">Nội Dung eBook</div>
            <h2 className="text-white font-serif font-bold text-4xl md:text-5xl leading-tight mb-4">9 Chương.<br />4 Siêu Năng Lực.<br /><span className="g bg-gradient-to-br from-[#d4a843] to-[#f0c866] bg-clip-text text-transparent">1 Hệ Thống Hoàn Chỉnh.</span></h2>
            <p className="text-white/70 text-lg max-w-[560px] mx-auto leading-relaxed">Không phải tips lẻ tẻ. Đây là blueprint đầy đủ để biến Claude Co-work thành AI employee thực sự của bạn.</p>
          </div>

          <div className="features-grid">
            {[
              { num: "01 / 09", icon: "🤖", title: "Claude Co-work Là Gì?", desc: "Kiến trúc toàn diện, cách 4 thành phần cốt lõi hoạt động cùng nhau và tại sao 90% đang dùng sai.", tag: "Nền tảng" },
              { num: "02 / 09", icon: "⚡", title: "Cơ Bản vs Nâng Cao", desc: "So sánh trực quan giữa người dùng 10% và 100% — và con đường chính xác để vượt ranh giới đó.", tag: "So sánh" },
              { num: "03 / 09", icon: "📋", title: "Tệp Claude MD", desc: "6 yếu tố bắt buộc trong tệp nhận dạng. Claude sẽ biết bạn là ai, không cần giải thích lại bao giờ nữa.", tag: "Siêu năng lực #1" },
              { num: "04 / 09", icon: "🎯", title: "Skills — Dạy Một Lần", desc: "Cách tạo, cài đặt và quản lý skills. Một từ khóa kích hoạt toàn bộ quy trình phức tạp.", tag: "Siêu năng lực #2" },
              { num: "05 / 09", icon: "🔌", title: "Connectors", desc: "Kết nối 38+ ứng dụng native + hack Zapier MCP để truy cập 8,000+ apps. Claude có chìa khóa văn phòng của bạn.", tag: "Siêu năng lực #3" },
              { num: "06–09", icon: "⏰", title: "Scheduled Tasks + 7 Skills + System", desc: "Tự động hóa hoàn toàn, 7 skills thiết yếu tôi dùng mỗi ngày, so sánh Co-work vs Code, và sơ đồ hệ thống toàn diện.", tag: "Siêu năng lực #4 + Tổng kết" }
            ].map((feat, i) => (
              <div key={i} className={`feat-card reveal reveal-delay-${(i % 3) + 1}`} ref={addToRefs}>
                <div className="feat-num">{feat.num}</div>
                <span className="feat-icon">{feat.icon}</span>
                <h3 className="text-white font-serif font-bold text-xl mb-2">{feat.title}</h3>
                <p className="text-white/35 text-sm leading-relaxed">{feat.desc}</p>
                <div className="feat-tag">{feat.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7 SKILLS ══ */}
      <section className="skills-sec">
        <div className="wrap">
          <div className="sec-head reveal" ref={addToRefs}>
            <div className="tag-pill tag-teal">7 Skills Thiết Yếu</div>
            <h2 className="text-white font-serif font-bold text-4xl md:text-5xl leading-tight mb-4">Những Skills Tôi Không Thể<br /><em className="italic text-[#e8512a]">Sống Thiếu Mỗi Ngày</em></h2>
            <p className="text-white/70 text-lg max-w-[560px] mx-auto leading-relaxed">Tất cả đều được bao gồm trong eBook — kèm hướng dẫn cài đặt từng bước và template để bạn tải ngay.</p>
          </div>

          <div className="skills-grid reveal" ref={addToRefs}>
            {[
              { num: "01", icon: "☀️", title: "Morning Briefing", desc: "Tự động quét lịch, email, AI news và tạo dashboard HTML đẹp trước khi bạn mở máy.", keyword: "morning briefing" },
              { num: "02", icon: "🔍", title: "Research Assistant", desc: "Từ bất kỳ chủ đề nào → tài liệu nghiên cứu có cấu trúc với nguồn trích dẫn đầy đủ.", keyword: "research assistant" },
              { num: "03", icon: "📋", title: "Meeting → Action Items", desc: "Dán transcript → nhận ngay tóm tắt, danh sách việc cần làm và deadline cụ thể.", keyword: "meeting notes" },
              { num: "04", icon: "🎞️", title: "Slide Deck Generator", desc: "Từ một câu → bài trình bày chuyên nghiệp trong 30 giây. Tiết kiệm 3 giờ/lần.", keyword: "slide deck generator" },
              { num: "05", icon: "🖼️", title: "Visual Explainer", desc: "Trang web tương tác giải thích bất kỳ khái niệm phức tạp nào — kiến trúc, quy trình, dữ liệu.", keyword: "visual explainer" },
              { num: "06", icon: "📐", title: "Diagram Generator", desc: "Mô tả bất kỳ thứ gì → sơ đồ Excalidraw chuyên nghiệp, nhập trực tiếp.", keyword: "diagram generator" }
            ].map((skill, i) => (
              <div key={i} className="skill-row">
                <div className="skill-num-big">{skill.num}</div>
                <div className="skill-body">
                  <h4 className="text-white font-semibold mb-1">{skill.icon} {skill.title}</h4>
                  <p className="text-white/35 text-sm leading-relaxed">{skill.desc}</p>
                  <span className="skill-keyword">{skill.keyword}</span>
                </div>
              </div>
            ))}
            <div className="skill-row col-span-full">
              <div className="skill-num-big">07</div>
              <div className="skill-body">
                <h4 className="text-white font-semibold mb-1">🛠️ Skill Creator — Tạo Skill Cho Nghề Của Bạn</h4>
                <p className="text-white/35 text-sm leading-relaxed">Skill tạo ra skill. Bạn mô tả quy trình → Claude đóng gói thành skill hoàn chỉnh, phù hợp bất kỳ nghề nghiệp nào — giáo viên, môi giới, designer, freelancer...</p>
                <span className="skill-keyword">skill creator</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TRANSFORMATION ══ */}
      <section className="transform">
        <div className="wrap">
          <div className="sec-head reveal" ref={addToRefs}>
            <div className="tag-pill tag-sky">Trước & Sau</div>
            <h2 className="text-white font-serif font-bold text-4xl md:text-5xl leading-tight mb-4">Cuộc Đời Của Bạn<br /><em className="italic text-[#e8512a]">Trước Và Sau</em> eBook Này</h2>
          </div>

          <div className="transform-grid reveal" ref={addToRefs}>
            <div className="before-col">
              <div className="col-label">Trước khi đọc eBook</div>
              {[
                { icon: "😤", title: "Bắt đầu lại từ đầu mỗi ngày", desc: "Claude không nhớ gì. Bạn phải giải thích lại bối cảnh, giọng điệu, mọi thứ." },
                { icon: "📋", title: "15 tab mở, copy-paste liên tục", desc: "Email ở đây, lịch ở kia, Slack chỗ khác. Thủ công 100%." },
                { icon: "⏱️", title: "3 giờ cho một bài trình bày", desc: "Mỗi slide là công sức thủ công. Mỗi sơ đồ là cả buổi chiều." },
                { icon: "😴", title: "Claude nghỉ khi bạn nghỉ", desc: "Ngoài giờ làm = không có gì được thực hiện." }
              ].map((item, i) => (
                <div key={i} className="transform-item">
                  <span className="t-icon">{item.icon}</span>
                  <div>
                    <h5 className="text-white/70 font-semibold mb-1">{item.title}</h5>
                    <p className="text-white/35 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="after-col">
              <div className="col-label">Sau khi đọc eBook</div>
              {[
                { icon: "🧠", title: "Claude biết bạn mỗi ngày", desc: "Tệp Claude MD đọc tự động. Không giải thích, không lặp lại." },
                { icon: "🔌", title: "Tất cả apps kết nối thành một", desc: "Claude đọc email, lịch, Drive trực tiếp. Bạn chỉ nhìn kết quả." },
                { icon: "⚡", title: "30 giây cho một bài trình bày", desc: "Một câu lệnh. Slide đẹp với animation xuất hiện ngay lập tức." },
                { icon: "🚀", title: "Claude làm việc khi bạn ngủ", desc: "7am: Morning brief trong Slack. 6pm: Wrap-up tự động. 24/7." }
              ].map((item, i) => (
                <div key={i} className="transform-item">
                  <span className="t-icon">{item.icon}</span>
                  <div>
                    <h5 className="text-white font-semibold mb-1">{item.title}</h5>
                    <p className="text-white/75 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="testimonials">
        <div className="wrap">
          <div className="sec-head reveal" ref={addToRefs}>
            <div className="tag-pill tag-gold">Phản Hồi Độc Giả</div>
            <h2 className="text-white font-serif font-bold text-4xl md:text-5xl leading-tight mb-4">Họ Đã <em className="italic text-[#e8512a]">Thay Đổi Hoàn Toàn</em><br />Cách Làm Việc</h2>
          </div>

          <div className="testi-grid">
            {[
              { name: "Nguyễn Lan Anh", role: "Marketing Manager · TP.HCM", text: "Tôi đã dùng Claude hàng ngày nhưng chưa bao giờ nghĩ nó có thể làm được nhiều thế. Morning briefing chạy lúc 7am, tôi thức dậy đã có tất cả trong Slack. Thực sự thay đổi cuộc chơi.", avatar: "👩‍💼" },
              { name: "Trần Thành Đạt", role: "Real Estate Agent · Hà Nội", text: "Phần Zapier MCP là thứ tôi cần nhất. Kết nối được với hệ thống CRM của công ty mà không cần connector native. Skill creator giúp tôi tự tạo workflow cho nghề môi giới BĐS của mình.", avatar: "🏢" },
              { name: "Lê Minh Hoàng", role: "Giáo viên THPT · Đà Nẵng", text: "Tôi là giáo viên. Skill Creator giúp tôi tạo skill soạn giáo án tự động trong 10 phút. Mỗi tuần tiết kiệm cả ngày làm việc. Đây là khoản đầu tư tốt nhất trong năm.", avatar: "👨‍🏫" }
            ].map((testi, i) => (
              <div key={i} className={`testi-card reveal reveal-delay-${i + 1}`} ref={addToRefs}>
                <div className="testi-stars flex gap-1 text-[#d4a843] text-sm tracking-widest">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <div className="testi-text font-serif italic text-white/70 text-lg leading-relaxed flex-1">"{testi.text}"</div>
                <div className="testi-author flex items-center gap-3">
                  <div className="author-avatar w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg">{testi.avatar}</div>
                  <div>
                    <div className="author-name text-white font-semibold text-sm">{testi.name}</div>
                    <div className="author-role text-white/35 text-[11px]">{testi.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section className="pricing" id="pricing">
        <div className="wrap">
          <div className="sec-head reveal" ref={addToRefs}>
            <div className="tag-pill tag-flame">Chọn Gói Của Bạn</div>
            <h2 className="text-white font-serif font-bold text-4xl md:text-5xl leading-tight mb-4">Đầu Tư Một Lần,<br /><span className="g bg-gradient-to-br from-[#d4a843] to-[#f0c866] bg-clip-text text-transparent">Tiết Kiệm Mãi Mãi</span></h2>
            <p className="text-white/70 text-lg max-w-[560px] mx-auto leading-relaxed">Một tuần tiết kiệm 11 giờ làm việc. Bạn muốn bắt đầu hôm nay chứ?</p>
          </div>

          <div className="pricing-cards">
            {/* Basic */}
            <div className="pricing-card reveal reveal-delay-1" ref={addToRefs}>
              <div className="plan-name">Cơ Bản</div>
              <div className="plan-price font-serif font-bold text-5xl text-white leading-none mb-1"><sup>₫</sup>199<span className="period text-base font-light text-white/35">.000</span></div>
              <div className="plan-orig text-xs text-white/35 line-through mb-2">₫399.000</div>
              <div className="plan-save inline-block bg-[#4ecb71]/10 border border-[#4ecb71]/25 text-[#4ecb71] px-2 py-0.5 rounded text-[11px] font-bold mb-5">Tiết kiệm 50%</div>
              <div className="plan-divider h-px bg-white/10 my-5" />
              <ul className="plan-features flex flex-col gap-3 mb-7">
                <li>eBook PDF đầy đủ 9 chương</li>
                <li>Tất cả sơ đồ trực quan</li>
                <li>Hướng dẫn cài đặt từng bước</li>
                <li className="muted text-white/35">Không bao gồm template skills</li>
                <li className="muted text-white/35">Không bao gồm cộng đồng</li>
                <li className="muted text-white/35">Không có hỗ trợ trực tiếp</li>
              </ul>
              <a href="#" className="btn-plan btn-plan-outline">Tải eBook →</a>
            </div>

            {/* Pro */}
            <div className="pricing-card featured reveal reveal-delay-2" ref={addToRefs}>
              <div className="featured-badge absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#e8512a] to-[#ff7347] text-white px-5 py-1 rounded-full text-[11px] font-bold tracking-wider whitespace-nowrap">🔥 Phổ biến nhất</div>
              <div className="plan-name">Pro</div>
              <div className="plan-price font-serif font-bold text-5xl text-white leading-none mb-1"><sup>₫</sup>299<span className="period text-base font-light text-white/35">.000</span></div>
              <div className="plan-orig text-xs text-white/35 line-through mb-2">₫699.000</div>
              <div className="plan-save inline-block bg-[#4ecb71]/10 border border-[#4ecb71]/25 text-[#4ecb71] px-2 py-0.5 rounded text-[11px] font-bold mb-5">Tiết kiệm 57%</div>
              <div className="plan-divider h-px bg-white/10 my-5" />
              <ul className="plan-features flex flex-col gap-3 mb-7">
                <li>eBook PDF đầy đủ 9 chương</li>
                <li>Tất cả sơ đồ trực quan</li>
                <li>Hướng dẫn cài đặt từng bước</li>
                <li><strong>7 template skills sẵn dùng</strong></li>
                <li><strong>Tệp Claude MD mẫu</strong></li>
                <li><strong>Cộng đồng hỗ trợ 30 ngày</strong></li>
              </ul>
              <a href="#" className="btn-plan btn-plan-primary">Mua Pro Ngay →</a>
            </div>

            {/* Team */}
            <div className="pricing-card reveal reveal-delay-3" ref={addToRefs}>
              <div className="plan-name">Team</div>
              <div className="plan-price font-serif font-bold text-5xl text-white leading-none mb-1"><sup>₫</sup>799<span className="period text-base font-light text-white/35">.000</span></div>
              <div className="plan-orig text-xs text-white/35 line-through mb-2">₫1.499.000</div>
              <div className="plan-save inline-block bg-[#4ecb71]/10 border border-[#4ecb71]/25 text-[#4ecb71] px-2 py-0.5 rounded text-[11px] font-bold mb-5">Tiết kiệm 47%</div>
              <div className="plan-divider h-px bg-white/10 my-5" />
              <ul className="plan-features flex flex-col gap-3 mb-7">
                <li>Tất cả quyền lợi gói Pro</li>
                <li><strong>Dùng cho 5 thành viên team</strong></li>
                <li><strong>Buổi workshop trực tuyến 90 phút</strong></li>
                <li><strong>Q&A trực tiếp với tác giả</strong></li>
                <li><strong>Template cho 10+ ngành nghề</strong></li>
                <li><strong>Hỗ trợ ưu tiên 60 ngày</strong></li>
              </ul>
              <a href="#" className="btn-plan btn-plan-outline">Liên hệ Team →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="faq">
        <div className="wrap">
          <div className="sec-head reveal" ref={addToRefs}>
            <div className="tag-pill tag-sky">Câu Hỏi Thường Gặp</div>
            <h2 className="text-white font-serif font-bold text-4xl md:text-5xl leading-tight mb-4">Câu Hỏi <em className="italic text-[#e8512a]">Bạn Đang</em> Có</h2>
          </div>

          <div className="faq-grid wrap-narrow !max-w-full">
            {[
              { q: "Tôi cần trả thêm phí cho Claude Co-work không?", a: "Claude Co-work là tính năng miễn phí trong ứng dụng desktop của Claude (miễn phí tải về). Tuy nhiên, để dùng đầy đủ tính năng, bạn cần tài khoản Claude Pro (~$20/tháng). eBook này dạy bạn khai thác tối đa khoản đầu tư đó." },
              { q: "eBook có phù hợp với người không biết lập trình không?", a: "Hoàn toàn phù hợp! Claude Co-work được thiết kế cho người không cần kỹ thuật. Tất cả các bước trong eBook đều có hình ảnh minh họa và không yêu cầu bất kỳ kiến thức lập trình nào. Nếu bạn biết dùng smartphone, bạn có thể làm được." },
              { q: "Tôi nhận được file gì sau khi mua?", a: "Gói Pro bao gồm: (1) eBook PDF 9 chương đầy đủ, (2) 7 file skill template (.zip) sẵn sàng upload, (3) Template tệp Claude MD mẫu, (4) Checklist thiết lập từng bước. Tất cả gửi qua email ngay sau thanh toán." },
              { q: "Chính sách hoàn tiền như thế nào?", a: "Bảo đảm hoàn tiền 100% trong vòng 30 ngày, không hỏi lý do. Nếu bạn làm theo hướng dẫn mà không thấy kết quả, gửi email cho chúng tôi và bạn sẽ được hoàn toàn bộ số tiền đã trả." },
              { q: "Sự khác biệt giữa Co-work và Claude Code là gì?", a: "Claude Code chạy trong terminal, chủ yếu dành cho nhà phát triển muốn viết và deploy code. Claude Co-work là giao diện đồ họa dễ dùng, phù hợp cho mọi người — kết nối apps, tự động hóa workflow, không cần biết lập trình. eBook có chương so sánh chi tiết." },
              { q: "Nội dung có được cập nhật khi Claude thay đổi không?", a: "Có. Tất cả người mua nhận được cập nhật miễn phí khi có phiên bản mới của eBook. Claude Co-work đang phát triển nhanh và chúng tôi cam kết cập nhật nội dung theo các tính năng mới." }
            ].map((item, i) => (
              <div key={i} className={`faq-item reveal ${openFaq === i ? 'open' : ''}`} onClick={() => toggleFaq(i)} ref={addToRefs}>
                <div className="faq-q flex items-center justify-between gap-4">
                  <span className="faq-q-text text-white font-semibold text-sm md:text-base leading-tight">{item.q}</span>
                  <span className="faq-chevron w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs text-white/35 transition-all duration-300">
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </span>
                </div>
                <div className={`faq-a overflow-hidden transition-all duration-350 ease-in-out text-white/35 text-sm leading-relaxed ${openFaq === i ? 'max-h-[300px] mt-4' : 'max-h-0'}`}>
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GUARANTEE ══ */}
      <section className="guarantee-sec">
        <div className="wrap">
          <div className="guarantee-inner reveal" ref={addToRefs}>
            <div className="guarantee-badge w-[120px] h-[120px] rounded-full flex items-center justify-center flex-shrink-0 relative">
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#d4a843]/30 animate-[spin_20s_linear_infinite]" />
              <Shield className="w-12 h-12 text-[#d4a843] relative z-10" />
            </div>
            <div className="guarantee-body">
              <h3 className="text-white font-serif font-bold text-3xl mb-3">Bảo Đảm Hoàn Tiền 30 Ngày</h3>
              <p className="text-white/70 text-sm leading-relaxed">Nếu bạn đọc eBook, làm theo hướng dẫn, và không thấy Claude Co-work tiết kiệm được ít nhất <strong className="text-white">5 giờ mỗi tuần</strong> cho bạn — chúng tôi hoàn tiền 100%, không câu hỏi, không điều kiện. Rủi ro hoàn toàn từ phía chúng tôi, không phải bạn.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="final-cta">
        <div className="final-cta-inner wrap-narrow !text-center">
          <div className="tag-pill tag-flame inline-flex mb-4">⏳ Ưu đãi có hạn</div>

          <div className="countdown-row reveal" ref={addToRefs}>
            <div className="countdown-box">
              <div className="countdown-num">{countdown.h}</div>
              <div className="countdown-label">Giờ</div>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-box">
              <div className="countdown-num">{countdown.m}</div>
              <div className="countdown-label">Phút</div>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-box">
              <div className="countdown-num">{countdown.s}</div>
              <div className="countdown-label">Giây</div>
            </div>
          </div>

          <h2 className="final-h reveal text-white font-serif font-bold text-4xl md:text-6xl leading-tight my-6" ref={addToRefs}>
            Bắt Đầu Hành Trình<br /><em className="italic text-[#e8512a]">Từ 10% Lên</em> <span className="g bg-gradient-to-br from-[#d4a843] to-[#f0c866] bg-clip-text text-transparent">100%</span>
          </h2>

          <p className="final-sub reveal text-white/70 text-lg max-w-[520px] mx-auto leading-relaxed mb-10" ref={addToRefs}>Mỗi tuần bạn chờ đợi = thêm 11 giờ bị lãng phí. Hôm nay là ngày tốt nhất để bắt đầu. Ngày tốt thứ hai là ngày mai.</p>

          <div className="final-actions reveal flex flex-col items-center gap-4" ref={addToRefs}>
            <a href="#pricing" className="btn-final group">
              🚀 Mua eBook Pro — 299.000₫
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <div className="final-note text-xs text-white/35">🛡️ Bảo đảm hoàn tiền 30 ngày · Nhận ngay qua email · Thanh toán an toàn</div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="px-10 py-10 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
        <div className="footer-logo text-white font-serif font-semibold text-lg">Claude <span className="text-[#e8512a]">Co-work</span> Mastery</div>
        <div className="footer-copy text-xs text-white/35">© 2025 · Tất cả quyền được bảo lưu</div>
        <div className="footer-links flex gap-6">
          <a href="#" className="text-xs text-white/35 hover:text-white transition-colors">Điều khoản</a>
          <a href="#" className="text-xs text-white/35 hover:text-white transition-colors">Bảo mật</a>
          <a href="#" className="text-xs text-white/35 hover:text-white transition-colors">Liên hệ</a>
          <a href="#" className="text-xs text-white/35 hover:text-white transition-colors">Hoàn tiền</a>
        </div>
      </footer>
    </div>
  );
}
