/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  X,
  Menu,
  Moon,
  Sun,
  Play,
  Pause,
  LayoutGrid,
  MoveHorizontal
} from 'lucide-react';


interface PortfolioItem {
  id: number;
  category: 'stage' | 'lobby' | 'centerpiece' | 'vip' | 'opening';
  categoryLabel: string;
  title: string;
  spec: string;
  image: string;
  description: string;
  flowers: string;
  recommended: string;
}

const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 1,
    category: 'centerpiece',
    categoryLabel: '테이블 센터피스',
    title: '이그제큐티브 뱅큇 센터피스',
    spec: 'SPEC: 450 × 180 mm',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByz-Bzz4T0F9gjnFsnvzUKUs0qP9emdwIP4T5Sz6butisrkk7apYMaw-lriodjxhJBK7RO6cAYBfyNY_Gtyb1qLQ4lSOKtlCf_XIqOzyrDrD44VQ9wiF9wMMhXH-y4mFg_XiX95VJKr_epkLRCwPBdFwfrX3rbaBgYBQxu7_tUehdHJZfnGx6_mC9yWttlVPdNw6R1gc4y1JAqZrbVIYldA6SDkv99xR7auGT5ULp1lM1bCH7vHnK33Q',
    description: '만찬 행사의 격식을 완성하는 프리미엄 로우 센터피스입니다. 식사 및 대화 시 맞은편 VIP의 시야를 가리지 않도록 18cm 이내의 높이로 계산되어 연출됩니다.',
    flowers: '오하라 장미, 튤립, 유칼립투스 파블로, 카라, 아스틸베',
    recommended: '최고위급 만찬, 주주총회 VIP 테이블, 조찬 포럼'
  },
  {
    id: 2,
    category: 'lobby',
    categoryLabel: '로비 & 리셉션 공간 장식',
    title: '아키텍처럴 플로럴 인스톨레이션',
    spec: 'SPEC: Height 1,800mm+',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVSqvtOJvdUkfWw-sYW5SIUkR7GGRNLvVTRB_o9UwHaUT0HmkOmGb_r_R3dIDGPlzWUQSafhSHC1wiCgjOiYd37BGAjGCYBHOyXdR1bt0bOiIAEt4kTIPHsXaWXsvTESEIUMHBUr1Mx7XS-QF8HonhI5QOszW5j3pqZWtQkTQOu7rcUTlqvKSzWgbyLanir3Zgu19SF2AKzrp-LCz_RO-4-tMPBrUHGmBVnj-TvlNNvYr7O4bY-SxBzw',
    description: '컨벤션 홀 및 사옥 로비의 보이드 공간을 웅장하게 장식하는 수직형 플로럴 아키텍처입니다. 포토제닉한 첫인상을 제공합니다.',
    flowers: '극락조화, 몬스테라, 심비디움, 델피늄, 화이트 글라디올러스',
    recommended: '사옥 로비 주간 셋업, 브랜드 갈라쇼, 국제 학회 리셉션'
  },
  {
    id: 3,
    category: 'vip',
    categoryLabel: 'VIP 의전 꽃다발',
    title: '비스포크 VIP 베이스 & 부케',
    spec: 'VIP HANDCRAFTED',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9TJtPyPPKPHsdVn9CgLxdtT1PsmcyVCcSbwauyjbwMpakI-1MBnb2Ag2lMH9hVB55tXiIT9bbul6HAk08qn898uXocflIe241BdiJVzIkGVXUsGsq5EDcNduwrqN9bxpTyJlFXMjjVAOy9YdqV-0dHrutxwuQdIxA5NAFMzAFudiikchmVWxC_bu_0wJB96SVjSPs0rTZ-tRedKi8bvAakqU6cwTdU5M6RDU7k5toiJXYprTPvrl56w',
    description: '크리스털 화기와 비비드한 오렌지 라넌큘러스가 조화를 이루는 고품격 VIP 전용 어레인지먼트입니다. 시상식 직후 화기째 집무실이나 자택으로 이동 가능합니다.',
    flowers: '오렌지 라넌큘러스, 옐로우 스토크, 왁스플라워, 카네이션',
    recommended: '정부 및 해외 귀빈 의전, 퇴임식, 공로패 수여식'
  },
  {
    id: 4,
    category: 'stage',
    categoryLabel: '행사장·무대 플라워',
    title: '키노트 스테이지 보태니컬 아치 & 포디움',
    spec: 'PODIUM & STAGE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKf4JkvtLjWxTp1KTR9a32Pua3dPp4hzXMcA-9L1OWC_06OjPHu0SsAsS7RoDtPAEGbH4bTX9N_KhDJMJVeOlQhTh-i0U-ztpAzu_DQw3RdMZybFWeSK-aeyW7TlTk0vbhe4TiZSeMj4HNg5WuADCrreoKzZBJp-Wun9OALcfdeehJBnCWmnl5f_ouusaKEQC2NsTs8ZqxhzCR_a95xn_o2gSIGwhulCwPi7lmqsvkM6stmlZLVle97g',
    description: '연사의 시선과 카메라 조명 반사를 고려해 반무광 잎사귀와 정갈한 화이트 플라워로 안정감을 부여하는 강연대 전용 스타일링입니다.',
    flowers: '호접란, 안스리움, 아스파라거스 미리오클라두스, 백합',
    recommended: '학술 세미나, 신제품 발표회, 주주총회 단상'
  },
  {
    id: 5,
    category: 'opening',
    categoryLabel: '개업·오픈 축하',
    title: '컨템포러리 축하 스탠딩 오브제',
    spec: 'PREMIUM STAND',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeSaV_nUEGkiBzDiLq9dcZxKNQctUgmkCK3cx7EDiRSQ44QfFRew1pDp_1bygMGD1u22HNfmYQcVoPhLCBfR_qs-NtBsNFvkPtB7rlsIUwdO1Uk43tJYwsgJ7tXa-VCwkUB4dOIfZPIDQYb0mfUhaWk4b8crvK4gYxBzS7bEuQ3Pfg9H4UUM9amtOnA0eGnO7rvwXCNF0uqK1P6ZuQ5-erZ3vJGTr3D5i6PF1C31hUT6l9VoyIvmTv8w',
    description: '기존 3단 화환의 조악함을 탈피하여 현대적인 갤러리 오브제 형태로 디자인된 축하 스탠드입니다. 리본 대신 세련된 황동/아크릴 네임보드가 부착됩니다.',
    flowers: '대형 몬스테라, 카라, 킹프로테아, 수국',
    recommended: '플래그십 스토어 오픈, 갤러리 개관전, 신사옥 이전식'
  },
  {
    id: 6,
    category: 'lobby',
    categoryLabel: '로비 & 브랜드 팝업',
    title: '브랜드 런칭 쇼케이스 플라워 존',
    spec: 'SHOWCASE STYLING',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNHzFSpBzyi0XAgY97tvkLzMH9bRLjkTfneiz8hFCkVQJfOQwek7IxqOesm3ikQ0z_Ls2oMNN3dtXARBl6o1g58TKRUHqI0qf6HINwYOeg6wOUcQzErw8S6mbqOz5QjJWcopEEXuYpLeUVhkH3wV90ZBLibMkPaMeOWBoHr1oJdhv4bvu5A0el2Xo4t0vKXruLNOspKfEND4P9ucHpvFRvfKyDQNi5euehGckbtFANJYG4RkMv3xoJTw',
    description: '브랜드 키 비주얼 및 제품 컬러에 맞춰 식생을 큐레이션하고, 방문객의 인스타그램 인증샷을 유도하는 포토제닉 공간 연출을 기획합니다.',
    flowers: '시즌별 맞춤 수입 생화 및 와일드 브랜치',
    recommended: '패션/뷰티 팝업 스토어, 프레스 컨퍼런스, 인플루언서 데이'
  }
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);
  const [viewMode, setViewMode] = useState<'flow' | 'grid'>('flow');
  const [isFlowPaused, setIsFlowPaused] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    contactName: '',
    companyName: '',
    contactPhone: '',
    contactEmail: '',
    eventDate: '',
    eventLocation: '',
    eventType: '',
    budgetRange: '',
    services: [] as string[],
    specialNotes: '',
    privacyConsent: false
  });

  const [submittedReceipt, setSubmittedReceipt] = useState<string | null>(null);

  // Initialize theme from storage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  const filteredPortfolio = selectedFilter === 'all'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter(item => item.category === selectedFilter);

  const getFlowItems = (items: PortfolioItem[]) => {
    if (items.length === 0) return [];
    const repeatCount = Math.max(2, Math.ceil(12 / items.length));
    const result: PortfolioItem[] = [];
    for (let i = 0; i < repeatCount; i++) {
      result.push(...items);
    }
    return result;
  };

  const handleCheckboxChange = (value: string) => {
    setFormData(prev => {
      const current = prev.services;
      if (current.includes(value)) {
        return { ...prev, services: current.filter(s => s !== value) };
      } else {
        return { ...prev, services: [...current, value] };
      }
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const receiptId = `FD-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedReceipt(receiptId);
    // Smooth scroll to confirmation
    setTimeout(() => {
      document.getElementById('inquirySuccessMessage')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const openModalWithItem = (item: PortfolioItem) => {
    setActiveModalItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModalItem(null);
    document.body.style.overflow = 'auto';
  };

  const handleSelectStyleFromModal = (category: string) => {
    closeModal();
    // Select matching checkbox service
    if (category === 'centerpiece' && !formData.services.includes('table')) {
      setFormData(prev => ({ ...prev, services: [...prev.services, 'table'] }));
    } else if (category === 'stage' && !formData.services.includes('stage')) {
      setFormData(prev => ({ ...prev, services: [...prev.services, 'stage'] }));
    } else if (category === 'lobby' && !formData.services.includes('lobby')) {
      setFormData(prev => ({ ...prev, services: [...prev.services, 'lobby'] }));
    } else if (category === 'vip' && !formData.services.includes('vip')) {
      setFormData(prev => ({ ...prev, services: [...prev.services, 'vip'] }));
    }
    const elem = document.getElementById('inquiry');
    elem?.scrollIntoView({ behavior: 'smooth' });
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-[#fcfaf6] dark:bg-[#111714] text-slate-800 dark:text-stone-200 transition-colors duration-300">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#fcfaf6]/90 dark:bg-[#111714]/90 backdrop-blur-md border-b border-[#eae5dc] dark:border-[#2a3830] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <a className="flex items-center space-x-3 group" href="#hero">
            <span className="material-symbols-outlined text-[#c68a4c] text-3xl transition-transform duration-500 group-hover:rotate-45">
              spa
            </span>
            <div className="flex flex-col">
              <span className="font-serif-kr text-xl font-bold tracking-widest text-[#1b2a22] dark:text-stone-100">
                오늘의 꽃
              </span>
              <span className="font-cinzel text-[10px] tracking-[0.25em] text-[#c68a4c]">
                FLOWER OF TODAY
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
            <a
              className="text-slate-600 dark:text-stone-300 hover:text-[#c68a4c] dark:hover:text-[#c68a4c] transition-colors"
              href="#brand"
            >
              브랜드 철학
            </a>
            <a
              className="text-slate-600 dark:text-stone-300 hover:text-[#c68a4c] dark:hover:text-[#c68a4c] transition-colors"
              href="#portfolio"
            >
              포트폴리오
            </a>
            <a
              className="text-slate-600 dark:text-stone-300 hover:text-[#c68a4c] dark:hover:text-[#c68a4c] transition-colors"
              href="#service"
            >
              기업 솔루션
            </a>
            <a
              className="text-slate-600 dark:text-stone-300 hover:text-[#c68a4c] dark:hover:text-[#c68a4c] transition-colors"
              href="#process"
            >
              진행 프로세스
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              aria-label="다크 모드 전환"
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-slate-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
              type="button"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-[#e8b87d]" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            <a
              className="hidden sm:inline-flex items-center space-x-2 bg-[#1b2a22] dark:bg-[#c68a4c] text-white dark:text-stone-900 px-5 py-2.5 rounded text-xs uppercase tracking-wider font-semibold hover:bg-stone-800 dark:hover:bg-[#e8b87d] transition-all shadow-sm"
              href="#inquiry"
            >
              <span>견적 상담 신청</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>

            <button
              aria-label="메뉴 열기"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="md:hidden p-2 text-slate-700 dark:text-stone-300"
              type="button"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 py-4 bg-[#fcfaf6] dark:bg-[#111714] border-b border-[#eae5dc] dark:border-[#2a3830] space-y-3 font-medium text-sm animate-in fade-in slide-in-from-top-2 duration-200">
            <a
              className="block py-2 text-slate-700 dark:text-stone-300"
              href="#brand"
              onClick={() => setMobileMenuOpen(false)}
            >
              브랜드 철학
            </a>
            <a
              className="block py-2 text-slate-700 dark:text-stone-300"
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
            >
              포트폴리오
            </a>
            <a
              className="block py-2 text-slate-700 dark:text-stone-300"
              href="#service"
              onClick={() => setMobileMenuOpen(false)}
            >
              기업 솔루션
            </a>
            <a
              className="block py-2 text-slate-700 dark:text-stone-300"
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
            >
              진행 프로세스
            </a>
            <a
              className="block py-2 text-[#c68a4c] font-semibold"
              href="#inquiry"
              onClick={() => setMobileMenuOpen(false)}
            >
              행사 꽃 견적 문의
            </a>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden" id="hero">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#c68a4c]/40 bg-[#c68a4c]/10 text-[#c68a4c] text-xs tracking-wider uppercase font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c68a4c] animate-pulse"></span>
                <span>Corporate Floral Architecture</span>
              </div>

              <h1 className="font-serif-kr text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-[1.25] tracking-tight">
                기업의 순간을<br />
                <span className="text-[#c68a4c] italic font-serif-kr font-normal">꽃</span>으로 완성합니다.
              </h1>

              <p className="text-slate-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl font-light">
                세미나, 창립기념식, 오픈 행사부터 VIP 의전까지 공간과 목적에 맞는 정제된 플라워 스타일링을 제안합니다. 품격 있는 비즈니스 공간을 연출해 드립니다.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <a
                  className="inline-flex items-center justify-center space-x-2 bg-[#1b2a22] dark:bg-[#c68a4c] text-white dark:text-stone-900 px-7 py-4 rounded font-medium text-sm hover:bg-stone-800 dark:hover:bg-[#e8b87d] transition-all shadow-md group"
                  href="#inquiry"
                >
                  <span>행사 꽃 주문 문의</span>
                  <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                    arrow_right_alt
                  </span>
                </a>

                <a
                  className="inline-flex items-center justify-center space-x-2 border border-slate-300 dark:border-stone-700 bg-transparent text-slate-700 dark:text-stone-200 px-7 py-4 rounded font-medium text-sm hover:border-[#c68a4c] dark:hover:border-[#c68a4c] transition-colors"
                  href="#portfolio"
                >
                  <span>포트폴리오 살펴보기</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 w-full h-full border border-[#c68a4c]/40 rounded pointer-events-none -z-0"></div>
                <div className="relative overflow-hidden rounded shadow-2xl bg-stone-200 dark:bg-stone-800 aspect-[4/5] z-10 group">
                  <img
                    alt="정갈한 기업 만찬 테이블 센터피스 플라워 장식"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIDb-CjnQzQ_rtUavK2P97vQqWZsVBAaCo5ABrwnPuhahhpoLtIOSksD-jNYJ8y8sqYcPLXPxvhT6hzUgBkp7Tc18yeyrRiPsTnybxeHEuCoJ4Dax2sIEXh2uHy5TnuY7QjUtnmnw0G71D-FIInXtcbYMNRqkczrGHWkXJyANXANm_fkklKzuzHXB-DuZCibua74zDbrZ_AObUAxQnlKjpnsEatZDrzRGDDP6_L1VUFRZXJ3dVzP7OFg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND PHILOSOPHY SECTION */}
      <section className="py-24 bg-[#f8f5ee] dark:bg-[#151e18] border-y border-[#eae5dc] dark:border-[#2a3830] transition-colors" id="brand">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative group">
                <div className="overflow-hidden rounded shadow-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 aspect-[3/4]">
                  <img
                    alt="크리스털 화기에 꽂힌 오렌지 라넌큘러스와 연노랑 스토크의 우아한 플라워 어레인지먼트"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center space-x-2">
                <span className="h-px w-8 bg-[#c68a4c]"></span>
                <span className="text-xs tracking-widest uppercase font-semibold text-[#c68a4c] font-cinzel">
                  BRAND PHILOSOPHY
                </span>
              </div>
              <h2 className="font-serif-kr text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-stone-100 leading-snug">
                단순한 꽃이 아닌,<br className="hidden sm:inline" /> 비즈니스의 품격을 전달하는 플로럴 아키텍처
              </h2>
              <p className="text-slate-600 dark:text-stone-300 leading-relaxed font-light text-base sm:text-lg">
                공간의 분위기와 행사의 목적을 깊이 이해하고, 기업의 중요한 순간에 걸맞은 꽃을 디자인합니다. 불필요한 장식은 덜어내고, 식물 고유의 유기적인 곡선과 절제된 컬러 밸런스로 방문객과 고객에게 잊지 못할 첫인상을 선사합니다.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                <div className="p-5 rounded bg-white/70 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 space-y-2">
                  <span className="font-cinzel text-[#c68a4c] text-lg font-bold block">01</span>
                  <h3 className="font-serif-kr text-sm font-bold text-slate-900 dark:text-stone-100">
                    Corporate Tailored
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-stone-400 leading-relaxed">
                    기업 CI 컬러와 브랜드 톤앤매너를 정교하게 계측하여 반영합니다.
                  </p>
                </div>
                <div className="p-5 rounded bg-white/70 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 space-y-2">
                  <span className="font-cinzel text-[#c68a4c] text-lg font-bold block">02</span>
                  <h3 className="font-serif-kr text-sm font-bold text-slate-900 dark:text-stone-100">
                    Premium Freshness
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-stone-400 leading-relaxed">
                    행사 당일 새벽 경매장에서 최고 등급 특선 생화만을 엄선하여 사용합니다.
                  </p>
                </div>
                <div className="p-5 rounded bg-white/70 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 space-y-2">
                  <span className="font-cinzel text-[#c68a4c] text-lg font-bold block">03</span>
                  <h3 className="font-serif-kr text-sm font-bold text-slate-900 dark:text-stone-100">
                    Total Direction
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-stone-400 leading-relaxed">
                    기획, 플라워 시안 수립, 온사이트 스타일링, 행사 후 철거까지 완결합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO & PRODUCTS SECTION */}
      <section className="py-24 overflow-hidden" id="portfolio">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center space-x-2">
              <span className="h-px w-6 bg-[#c68a4c]"></span>
              <span className="text-xs tracking-[0.2em] uppercase font-semibold text-[#c68a4c] font-cinzel">
                PORTFOLIO & PRODUCTS
              </span>
              <span className="h-px w-6 bg-[#c68a4c]"></span>
            </div>
            <h2 className="font-serif-kr text-3xl sm:text-4xl font-bold text-slate-900 dark:text-stone-100">
              기업의 격을 높이는 시그니처 플라워 컬렉션
            </h2>
            <p className="text-slate-600 dark:text-stone-400 text-sm">
              행사 규모와 환경에 최적화된 맞춤형 스타일링 레퍼런스를 살펴보세요.
            </p>
          </div>

          {/* Category Filters & View Toggle Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <div className="flex items-center justify-center flex-wrap gap-2">
              {[
                { id: 'all', label: '전체보기' },
                { id: 'stage', label: '행사장·무대 플라워' },
                { id: 'lobby', label: '로비·오브제 장식' },
                { id: 'centerpiece', label: '테이블 센터피스' },
                { id: 'vip', label: 'VIP 의전 꽃다발' },
                { id: 'opening', label: '개업·오픈 축하' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded transition-all cursor-pointer ${
                    selectedFilter === tab.id
                      ? 'bg-[#1b2a22] text-white dark:bg-[#c68a4c] dark:text-stone-900 shadow-sm'
                      : 'bg-stone-100 dark:bg-stone-800 text-slate-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* View Mode & Animation Controls */}
            <div className="flex items-center space-x-2 text-xs">
              {viewMode === 'flow' && (
                <button
                  onClick={() => setIsFlowPaused(prev => !prev)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded border border-[#eae5dc] dark:border-[#2a3830] bg-white dark:bg-[#18221c] text-slate-700 dark:text-stone-300 hover:border-[#c68a4c] transition-colors cursor-pointer"
                  title={isFlowPaused ? '흐름 재생' : '일시정지'}
                  type="button"
                >
                  {isFlowPaused ? (
                    <>
                      <Play className="w-3.5 h-3.5 text-[#c68a4c]" />
                      <span>흐름 재생</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-3.5 h-3.5 text-[#c68a4c]" />
                      <span>일시정지</span>
                    </>
                  )}
                </button>
              )}

              <div className="inline-flex rounded border border-[#eae5dc] dark:border-[#2a3830] p-0.5 bg-stone-100 dark:bg-stone-800">
                <button
                  onClick={() => setViewMode('flow')}
                  className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                    viewMode === 'flow'
                      ? 'bg-white dark:bg-[#18221c] text-[#c68a4c] shadow-xs'
                      : 'text-slate-500 dark:text-stone-400 hover:text-slate-800 dark:hover:text-stone-200'
                  }`}
                  type="button"
                >
                  <MoveHorizontal className="w-3.5 h-3.5" />
                  <span>흐르는 뷰</span>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-[#18221c] text-[#c68a4c] shadow-xs'
                      : 'text-slate-500 dark:text-stone-400 hover:text-slate-800 dark:hover:text-stone-200'
                  }`}
                  type="button"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>그리드 뷰</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* View content */}
        {viewMode === 'flow' ? (
          <div className="relative w-full mask-edge-fade py-4">
            <div className={`animate-flow gap-6 px-6 ${isFlowPaused ? 'flow-paused' : ''}`}>
              {getFlowItems(filteredPortfolio).map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="w-[300px] sm:w-[350px] shrink-0 group bg-white dark:bg-[#18221c] border border-[#eae5dc] dark:border-[#2a3830] rounded overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden aspect-[4/3] bg-stone-100 dark:bg-stone-800">
                    <img
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none select-none"
                      src={item.image}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-serif-kr text-base sm:text-lg font-bold text-slate-900 dark:text-stone-100 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-[#eae5dc] dark:border-[#2a3830] flex items-center justify-between">
                      <span className="text-[11px] text-[#c68a4c] font-semibold tracking-wider font-cinzel">
                        {item.spec}
                      </span>
                      <button
                        className="inline-flex items-center text-xs font-semibold text-[#1b2a22] dark:text-stone-300 hover:text-[#c68a4c] dark:hover:text-[#c68a4c] transition-colors cursor-pointer"
                        onClick={() => openModalWithItem(item)}
                        type="button"
                      >
                        <span>상세보기</span>
                        <span className="material-symbols-outlined text-sm ml-1">open_in_new</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-[11px] text-slate-400 dark:text-stone-500 mt-4 font-light">
              ✦ 마우스 커서를 올리거나 터치하면 흐름이 멈추며, '상세보기'를 통해 세부 정보를 확인할 수 있습니다.
            </p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPortfolio.map(item => (
                <div
                  key={item.id}
                  className="group bg-white dark:bg-[#18221c] border border-[#eae5dc] dark:border-[#2a3830] rounded overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative overflow-hidden aspect-[4/3] bg-stone-100 dark:bg-stone-800">
                    <img
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={item.image}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-serif-kr text-lg font-bold text-slate-900 dark:text-stone-100">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-[#eae5dc] dark:border-[#2a3830] flex items-center justify-between">
                      <span className="text-[11px] text-[#c68a4c] font-semibold tracking-wider font-cinzel">
                        {item.spec}
                      </span>
                      <button
                        className="inline-flex items-center text-xs font-semibold text-[#1b2a22] dark:text-stone-300 hover:text-[#c68a4c] dark:hover:text-[#c68a4c] transition-colors cursor-pointer"
                        onClick={() => openModalWithItem(item)}
                        type="button"
                      >
                        <span>상세보기</span>
                        <span className="material-symbols-outlined text-sm ml-1">open_in_new</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* CORPORATE SERVICES SECTION */}
      <section className="py-24 bg-stone-100/70 dark:bg-[#141d17] border-y border-[#eae5dc] dark:border-[#2a3830] transition-colors" id="service">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
            <div>
              <div className="inline-flex items-center space-x-2 mb-2">
                <span className="h-px w-6 bg-[#c68a4c]"></span>
                <span className="text-xs tracking-widest uppercase font-semibold text-[#c68a4c] font-cinzel">
                  SERVICES FOR CORPORATE
                </span>
              </div>
              <h2 className="font-serif-kr text-3xl sm:text-4xl font-bold text-slate-900 dark:text-stone-100">
                비즈니스 고객을 위한 전문적인 플라워 솔루션
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-stone-400 max-w-md">
              단순 납품을 넘어 기업의 아이덴티티와 행사의 성공을 뒷받침하는 올인원 플라워 디렉팅 서비스를 약속합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 bg-white dark:bg-[#18221c] rounded border border-[#eae5dc] dark:border-[#2a3830] hover:border-[#c68a4c]/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded bg-[#c68a4c]/10 text-[#c68a4c] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">event_available</span>
              </div>
              <h3 className="font-serif-kr text-lg font-bold text-slate-900 dark:text-stone-100 mb-2">
                01. 행사 목적별 플라워 기획
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-400 leading-relaxed">
                컨퍼런스, 정기 주주총회, VIP 갈라 디너, 오픈 기념식 등 행사 취지에 따른 1:1 맞춤 컨셉 제안서 및 컬러 무드보드를 사전에 제공합니다.
              </p>
            </div>

            <div className="p-8 bg-white dark:bg-[#18221c] rounded border border-[#eae5dc] dark:border-[#2a3830] hover:border-[#c68a4c]/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded bg-[#c68a4c]/10 text-[#c68a4c] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">architecture</span>
              </div>
              <h3 className="font-serif-kr text-lg font-bold text-slate-900 dark:text-stone-100 mb-2">
                02. 공간 최적화 플라워 스타일링
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-400 leading-relaxed">
                행사장 구조, 조명 색온도, 동선 간섭 여부를 정밀 분석하여 공간의 품격을 극대화하는 맞춤형 현장 배치를 완수합니다.
              </p>
            </div>

            <div className="p-8 bg-white dark:bg-[#18221c] rounded border border-[#eae5dc] dark:border-[#2a3830] hover:border-[#c68a4c]/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded bg-[#c68a4c]/10 text-[#c68a4c] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">local_shipping</span>
              </div>
              <h3 className="font-serif-kr text-lg font-bold text-slate-900 dark:text-stone-100 mb-2">
                03. 안전하고 정확한 정시 배송
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-400 leading-relaxed">
                전문 생화 전담 배송 차량 및 콜드체인 운용을 통해 생화 상태를 최상으로 보존하며 행사 셋업 시간에 100% 정시 도착합니다.
              </p>
            </div>

            <div className="p-8 bg-white dark:bg-[#18221c] rounded border border-[#eae5dc] dark:border-[#2a3830] hover:border-[#c68a4c]/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded bg-[#c68a4c]/10 text-[#c68a4c] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">loyalty</span>
              </div>
              <h3 className="font-serif-kr text-lg font-bold text-slate-900 dark:text-stone-100 mb-2">
                04. 대량 발주 및 분기·월 정기 구독
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-400 leading-relaxed">
                사옥 1층 로비, 임원실, 고객 접견실의 주간 정기 플라워 셋업 및 기업 임직원 경조사 연계 B2B 제휴 우대 견적을 지원합니다.
              </p>
            </div>

            <div className="p-8 bg-white dark:bg-[#18221c] rounded border border-[#eae5dc] dark:border-[#2a3830] hover:border-[#c68a4c]/50 transition-all duration-300 group lg:col-span-2">
              <div className="w-12 h-12 rounded bg-[#c68a4c]/10 text-[#c68a4c] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">cleaning_services</span>
              </div>
              <h3 className="font-serif-kr text-lg font-bold text-slate-900 dark:text-stone-100 mb-2">
                05. 원스톱 현장 세팅 & 행사 종료 후 철거 서비스
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-400 leading-relaxed">
                행사 시작 최소 2시간 전 플로리스트 팀이 상주하여 완벽히 세팅을 마치며, 행사 종료 시점 요청에 따라 폐기물 없이 신속하고 청결하게 철거를 대행합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5-STEP ORDER PROCESS SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12" id="process">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2">
            <span className="h-px w-6 bg-[#c68a4c]"></span>
            <span className="text-xs tracking-widest uppercase font-semibold text-[#c68a4c] font-cinzel">
              ORDER PROCESS
            </span>
            <span className="h-px w-6 bg-[#c68a4c]"></span>
          </div>
          <h2 className="font-serif-kr text-3xl sm:text-4xl font-bold text-slate-900 dark:text-stone-100">
            문의부터 행사 당일까지, 신뢰할 수 있는 5단계 프로세스
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-sm">
            체계적인 B2B 워크플로우를 통해 담당자님의 행사 준비 부담을 덜어드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 relative">
          <div className="bg-white dark:bg-[#18221c] p-6 rounded border border-[#eae5dc] dark:border-[#2a3830] flex flex-col justify-between relative group hover:border-[#c68a4c] transition-colors">
            <div className="space-y-4">
              <span className="font-cinzel text-xs text-[#c68a4c] font-bold tracking-widest block">STEP 01</span>
              <h3 className="font-serif-kr text-base font-bold text-slate-900 dark:text-stone-100">문의 접수</h3>
              <p className="text-xs text-slate-600 dark:text-stone-400 leading-relaxed">
                온라인 문의폼 또는 전담 유선 상담을 통해 행사 일정, 장소, 예산 범위를 신속히 파악합니다.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dashed border-stone-200 dark:border-stone-800 text-[11px] text-slate-400 dark:text-stone-500">
              2시간 이내 1차 회신
            </div>
          </div>

          <div className="bg-white dark:bg-[#18221c] p-6 rounded border border-[#eae5dc] dark:border-[#2a3830] flex flex-col justify-between relative group hover:border-[#c68a4c] transition-colors">
            <div className="space-y-4">
              <span className="font-cinzel text-xs text-[#c68a4c] font-bold tracking-widest block">STEP 02</span>
              <h3 className="font-serif-kr text-base font-bold text-slate-900 dark:text-stone-100">컨셉 & 공간 분석</h3>
              <p className="text-xs text-slate-600 dark:text-stone-400 leading-relaxed">
                행사 성격, 브랜드 CI 컬러, 호텔 및 행사장 공간 제원과 조명 환경을 분석합니다.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dashed border-stone-200 dark:border-stone-800 text-[11px] text-slate-400 dark:text-stone-500">
              온·오프라인 미팅 가능
            </div>
          </div>

          <div className="bg-white dark:bg-[#18221c] p-6 rounded border border-[#eae5dc] dark:border-[#2a3830] flex flex-col justify-between relative group hover:border-[#c68a4c] transition-colors">
            <div className="space-y-4">
              <span className="font-cinzel text-xs text-[#c68a4c] font-bold tracking-widest block">STEP 03</span>
              <h3 className="font-serif-kr text-base font-bold text-slate-900 dark:text-stone-100">맞춤 시안 & 견적</h3>
              <p className="text-xs text-slate-600 dark:text-stone-400 leading-relaxed">
                시각화된 플로럴 무드보드와 투명한 세부 견적서를 전달하여 최종 컨펌을 진행합니다.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dashed border-stone-200 dark:border-stone-800 text-[11px] text-slate-400 dark:text-stone-500">
              전자 세금계산서 발행
            </div>
          </div>

          <div className="bg-white dark:bg-[#18221c] p-6 rounded border border-[#eae5dc] dark:border-[#2a3830] flex flex-col justify-between relative group hover:border-[#c68a4c] transition-colors">
            <div className="space-y-4">
              <span className="font-cinzel text-xs text-[#c68a4c] font-bold tracking-widest block">STEP 04</span>
              <h3 className="font-serif-kr text-base font-bold text-slate-900 dark:text-stone-100">생화 엄선 및 제작</h3>
              <p className="text-xs text-slate-600 dark:text-stone-400 leading-relaxed">
                행사 당일 새벽 최고 등급 경매 생화를 공수해 전담 플로리스트 팀이 정밀하게 제작합니다.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dashed border-stone-200 dark:border-stone-800 text-[11px] text-slate-400 dark:text-stone-500">
              콜드체인 상태 유지
            </div>
          </div>

          <div className="bg-white dark:bg-[#18221c] p-6 rounded border border-[#eae5dc] dark:border-[#2a3830] flex flex-col justify-between relative group hover:border-[#c68a4c] transition-colors">
            <div className="space-y-4">
              <span className="font-cinzel text-xs text-[#c68a4c] font-bold tracking-widest block">STEP 05</span>
              <h3 className="font-serif-kr text-base font-bold text-slate-900 dark:text-stone-100">현장 세팅 & 사후 관리</h3>
              <p className="text-xs text-slate-600 dark:text-stone-400 leading-relaxed">
                행사 시작 최소 2시간 전 현장 세팅을 완료하고, 행사 종료 후 필요 시 신속 철거를 진행합니다.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-dashed border-stone-200 dark:border-stone-800 text-[11px] text-[#c68a4c] font-medium">
              완벽한 마무리 보장
            </div>
          </div>
        </div>
      </section>

      {/* MID-BANNER CTA */}
      <section className="relative py-20 bg-[#18261e] text-white overflow-hidden" id="mid-cta">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#c68a4c]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-900/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative max-w-5xl mx-auto px-6 lg:px-12 text-center space-y-6">
          <span className="inline-block px-3 py-1 rounded-full border border-[#e8b87d]/30 text-[#e8b87d] text-xs tracking-widest uppercase font-cinzel">
            Exclusive Corporate Floral
          </span>
          <h2 className="font-serif-kr text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            행사의 품격을 꽃으로 완성해보세요.
          </h2>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            행사 일정과 장소, 필요한 꽃의 구성을 남겨주시면 담당 시니어 플로리스트가 2시간 이내에 확인 후 맞춤 상담을 안내해 드립니다.
          </p>
          <div className="pt-4">
            <a
              className="inline-flex items-center space-x-2 bg-[#c68a4c] text-stone-900 px-8 py-4 rounded font-semibold text-sm hover:bg-[#e8b87d] transition-all shadow-lg hover:shadow-amber-900/20"
              href="#inquiry"
            >
              <span>지금 견적 문의 남기기</span>
              <span className="material-symbols-outlined text-base">arrow_downward</span>
            </a>
          </div>
        </div>
      </section>

      {/* ORDER & CONSULTATION INQUIRY FORM */}
      <section className="py-24 max-w-4xl mx-auto px-6 lg:px-12" id="inquiry">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2">
            <span className="h-px w-6 bg-[#c68a4c]"></span>
            <span className="text-xs tracking-widest uppercase font-semibold text-[#c68a4c] font-cinzel">
              ORDER & CONSULTATION INQUIRY
            </span>
            <span className="h-px w-6 bg-[#c68a4c]"></span>
          </div>
          <h2 className="font-serif-kr text-3xl sm:text-4xl font-bold text-slate-900 dark:text-stone-100">
            기업 행사 꽃 주문 및 견적 문의
          </h2>
          <p className="text-slate-600 dark:text-stone-400 text-sm max-w-lg mx-auto">
            정확한 정보를 남겨주시면, 행사 콘셉트에 최적화된 맞춤 플라워 제안서와 견적을 보내드립니다.
          </p>
        </div>

        <div className="bg-white dark:bg-[#18221c] p-8 sm:p-12 rounded border border-[#eae5dc] dark:border-[#2a3830] shadow-sm">
          <form className="space-y-8" id="corporateInquiryForm" onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-stone-300" htmlFor="contactName">
                  담당자명 <span className="text-[#c68a4c]">*</span>
                </label>
                <input
                  className="w-full text-sm rounded border border-[#eae5dc] dark:border-[#2a3830] bg-stone-50/50 dark:bg-stone-900/60 text-slate-800 dark:text-stone-200 focus:border-[#c68a4c] focus:outline-none focus:ring-1 focus:ring-[#c68a4c] p-3"
                  id="contactName"
                  name="contactName"
                  placeholder="예: 김민수 대리"
                  required
                  type="text"
                  value={formData.contactName}
                  onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-stone-300" htmlFor="companyName">
                  회사명 / 소속 부서 <span className="text-[#c68a4c]">*</span>
                </label>
                <input
                  className="w-full text-sm rounded border border-[#eae5dc] dark:border-[#2a3830] bg-stone-50/50 dark:bg-stone-900/60 text-slate-800 dark:text-stone-200 focus:border-[#c68a4c] focus:outline-none focus:ring-1 focus:ring-[#c68a4c] p-3"
                  id="companyName"
                  name="companyName"
                  placeholder="예: (주)한국금융 경영기획팀"
                  required
                  type="text"
                  value={formData.companyName}
                  onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-stone-300" htmlFor="contactPhone">
                  연락처 <span className="text-[#c68a4c]">*</span>
                </label>
                <input
                  className="w-full text-sm rounded border border-[#eae5dc] dark:border-[#2a3830] bg-stone-50/50 dark:bg-stone-900/60 text-slate-800 dark:text-stone-200 focus:border-[#c68a4c] focus:outline-none focus:ring-1 focus:ring-[#c68a4c] p-3"
                  id="contactPhone"
                  name="contactPhone"
                  placeholder="010-0000-0000"
                  required
                  type="tel"
                  value={formData.contactPhone}
                  onChange={e => setFormData({ ...formData, contactPhone: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-stone-300" htmlFor="contactEmail">
                  이메일 주소 <span className="text-[#c68a4c]">*</span>
                </label>
                <input
                  className="w-full text-sm rounded border border-[#eae5dc] dark:border-[#2a3830] bg-stone-50/50 dark:bg-stone-900/60 text-slate-800 dark:text-stone-200 focus:border-[#c68a4c] focus:outline-none focus:ring-1 focus:ring-[#c68a4c] p-3"
                  id="contactEmail"
                  name="contactEmail"
                  placeholder="official@company.com"
                  required
                  type="email"
                  value={formData.contactEmail}
                  onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-stone-300" htmlFor="eventDate">
                  행사 예정일 <span className="text-[#c68a4c]">*</span>
                </label>
                <input
                  className="w-full text-sm rounded border border-[#eae5dc] dark:border-[#2a3830] bg-stone-50/50 dark:bg-stone-900/60 text-slate-800 dark:text-stone-200 focus:border-[#c68a4c] focus:outline-none focus:ring-1 focus:ring-[#c68a4c] p-3"
                  id="eventDate"
                  min={todayStr}
                  name="eventDate"
                  required
                  type="date"
                  value={formData.eventDate}
                  onChange={e => setFormData({ ...formData, eventDate: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-stone-300" htmlFor="eventLocation">
                  행사 장소 (호텔/컨벤션/사옥 상세) <span className="text-[#c68a4c]">*</span>
                </label>
                <input
                  className="w-full text-sm rounded border border-[#eae5dc] dark:border-[#2a3830] bg-stone-50/50 dark:bg-stone-900/60 text-slate-800 dark:text-stone-200 focus:border-[#c68a4c] focus:outline-none focus:ring-1 focus:ring-[#c68a4c] p-3"
                  id="eventLocation"
                  name="eventLocation"
                  placeholder="예: 그랜드 인터컨티넨탈 서울 파르나스 5층 그랜드볼룸"
                  required
                  type="text"
                  value={formData.eventLocation}
                  onChange={e => setFormData({ ...formData, eventLocation: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-stone-300" htmlFor="eventType">
                  행사 종류 <span className="text-[#c68a4c]">*</span>
                </label>
                <select
                  className="w-full text-sm rounded border border-[#eae5dc] dark:border-[#2a3830] bg-stone-50/50 dark:bg-stone-900/60 text-slate-800 dark:text-stone-200 focus:border-[#c68a4c] focus:outline-none focus:ring-1 focus:ring-[#c68a4c] p-3"
                  id="eventType"
                  name="eventType"
                  required
                  value={formData.eventType}
                  onChange={e => setFormData({ ...formData, eventType: e.target.value })}
                >
                  <option value="">행사 구분을 선택해주세요</option>
                  <option value="corporate">기업 정기 행사 / 주주총회</option>
                  <option value="anniversary">창립기념식 / 비전선포식</option>
                  <option value="seminar">세미나 / 글로벌 컨퍼런스</option>
                  <option value="opening">오픈 / 개업 축하 행사</option>
                  <option value="vip">VIP 의전 행사 / 갈라 디너</option>
                  <option value="popup">브랜드 런칭 팝업 / 쇼케이스</option>
                  <option value="other">기타 맞춤 행사</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-stone-300" htmlFor="budgetRange">
                  예상 예산 <span className="text-[#c68a4c]">*</span>
                </label>
                <select
                  className="w-full text-sm rounded border border-[#eae5dc] dark:border-[#2a3830] bg-stone-50/50 dark:bg-stone-900/60 text-slate-800 dark:text-stone-200 focus:border-[#c68a4c] focus:outline-none focus:ring-1 focus:ring-[#c68a4c] p-3"
                  id="budgetRange"
                  name="budgetRange"
                  required
                  value={formData.budgetRange}
                  onChange={e => setFormData({ ...formData, budgetRange: e.target.value })}
                >
                  <option value="">예산 범위를 선택해주세요</option>
                  <option value="under10">10만원 이하</option>
                  <option value="10to30">10만원 ~ 30만원</option>
                  <option value="30to50">30만원 ~ 50만원</option>
                  <option value="50to100">50만원 ~ 100만원</option>
                  <option value="over100">100만원 이상</option>
                  <option value="custom">상담 후 결정</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-stone-300">
                필요한 상품 / 서비스 (다중 선택 가능)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {[
                  { id: 'table', label: '테이블 센터피스' },
                  { id: 'stage', label: '무대 / 단상 장식' },
                  { id: 'lobby', label: '로비 / 입구 대형 오브제' },
                  { id: 'vip', label: 'VIP 의전 꽃다발' },
                  { id: 'subscription', label: '정기 화훼 구독' },
                  { id: 'cleanup', label: '행사 후 현장 철거 서비스' }
                ].map(item => (
                  <label
                    key={item.id}
                    className={`flex items-center space-x-2 p-3 rounded border cursor-pointer transition-colors ${
                      formData.services.includes(item.id)
                        ? 'border-[#c68a4c] bg-[#c68a4c]/10 text-slate-900 dark:text-white'
                        : 'border-[#eae5dc] dark:border-[#2a3830] hover:bg-stone-50 dark:hover:bg-stone-800/40 text-slate-700 dark:text-stone-300'
                    }`}
                  >
                    <input
                      checked={formData.services.includes(item.id)}
                      className="rounded text-[#c68a4c] focus:ring-[#c68a4c] border-stone-300 accent-[#c68a4c]"
                      name="services"
                      type="checkbox"
                      value={item.id}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-stone-300" htmlFor="specialNotes">
                요청사항 및 상세 문의 내용
              </label>
              <textarea
                className="w-full text-sm rounded border border-[#eae5dc] dark:border-[#2a3830] bg-stone-50/50 dark:bg-stone-900/60 text-slate-800 dark:text-stone-200 focus:border-[#c68a4c] focus:outline-none focus:ring-1 focus:ring-[#c68a4c] p-3"
                id="specialNotes"
                name="specialNotes"
                placeholder="행사 성격, 브랜드 메인 컬러, 화기 회수 여부, 필요 수량 등 구체적인 내용을 자유롭게 적어주세요."
                rows={4}
                value={formData.specialNotes}
                onChange={e => setFormData({ ...formData, specialNotes: e.target.value })}
              ></textarea>
            </div>

            <div className="pt-2">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  checked={formData.privacyConsent}
                  className="mt-1 rounded text-[#c68a4c] focus:ring-[#c68a4c] border-stone-300 accent-[#c68a4c]"
                  id="privacyConsent"
                  required
                  type="checkbox"
                  onChange={e => setFormData({ ...formData, privacyConsent: e.target.checked })}
                />
                <span className="text-xs text-slate-500 dark:text-stone-400 leading-snug">
                  기업 행사 견적 산출 및 맞춤 상담 연락을 위한 개인정보(이름, 연락처, 회사명) 수집 및 이용에 동의합니다.
                </span>
              </label>
            </div>

            <div>
              <button
                className="w-full py-4 px-6 rounded bg-[#1b2a22] dark:bg-[#c68a4c] text-white dark:text-stone-900 font-bold text-sm tracking-wider uppercase hover:bg-stone-800 dark:hover:bg-[#e8b87d] transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                id="submitBtn"
                type="submit"
              >
                <span>기업 행사 플라워 문의 보내기</span>
                <span className="material-symbols-outlined text-base">send</span>
              </button>
            </div>
          </form>

          {/* Submission Success Box */}
          {submittedReceipt && (
            <div
              className="mt-6 p-6 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-3"
              id="inquirySuccessMessage"
            >
              <div className="inline-flex p-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded-full">
                <span className="material-symbols-outlined text-2xl">check_circle</span>
              </div>
              <h3 className="font-serif-kr text-lg font-bold text-emerald-950 dark:text-emerald-100">
                문의가 성공적으로 접수되었습니다.
              </h3>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 max-w-md mx-auto leading-relaxed">
                <strong>접수번호: {submittedReceipt}</strong><br />
                담당 시니어 플로리스트가 행사 요건을 검토한 후 2시간 이내에 공식 견적서와 함께 유선 및 이메일(
                <span className="font-medium underline">{formData.contactEmail}</span>
                )로 연락드리겠습니다.
              </p>
              <button
                onClick={() => setSubmittedReceipt(null)}
                className="text-xs text-emerald-700 dark:text-emerald-400 underline font-medium pt-2 block mx-auto cursor-pointer"
              >
                새 문의 작성하기
              </button>
            </div>
          )}
        </div>
      </section>

      {/* PORTFOLIO DETAIL MODAL */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
          id="portfolioModal"
          onClick={e => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-white dark:bg-[#18221c] max-w-lg w-full rounded border border-[#eae5dc] dark:border-[#2a3830] p-6 sm:p-8 relative shadow-2xl space-y-4">
            <button
              aria-label="닫기"
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-stone-200 p-1 cursor-pointer"
              onClick={closeModal}
              type="button"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#c68a4c] uppercase tracking-wider font-cinzel">
                {activeModalItem.categoryLabel}
              </span>
              <h3 className="font-serif-kr text-xl font-bold text-slate-900 dark:text-stone-100">
                {activeModalItem.title}
              </h3>
            </div>

            <div className="aspect-video w-full rounded overflow-hidden bg-stone-100 dark:bg-stone-800">
              <img
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
                src={activeModalItem.image}
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-stone-300 leading-relaxed font-light">
              {activeModalItem.description}
            </p>

            <div className="bg-stone-50 dark:bg-stone-900/80 p-4 rounded text-xs space-y-1.5 border border-[#eae5dc] dark:border-[#2a3830]">
              <div className="flex justify-between items-start gap-4">
                <span className="text-slate-500 dark:text-stone-400 shrink-0">주요 사용 화훼:</span>
                <span className="font-medium text-slate-800 dark:text-stone-200 text-right">
                  {activeModalItem.flowers}
                </span>
              </div>
              <div className="flex justify-between items-start gap-4">
                <span className="text-slate-500 dark:text-stone-400 shrink-0">추천 행사 유형:</span>
                <span className="font-medium text-slate-800 dark:text-stone-200 text-right">
                  {activeModalItem.recommended}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                className="block w-full text-center py-3 rounded bg-[#1b2a22] dark:bg-[#c68a4c] text-white dark:text-stone-900 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
                onClick={() => handleSelectStyleFromModal(activeModalItem.category)}
                type="button"
              >
                이 스타일로 견적 문의하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-stone-100 dark:bg-[#0e1410] border-t border-[#eae5dc] dark:border-[#2a3830] py-14 transition-colors">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-[#c68a4c] text-2xl">spa</span>
                <span className="font-serif-kr text-lg font-bold text-slate-900 dark:text-stone-100">
                  오늘의 꽃
                </span>
                <span className="text-xs text-slate-400 dark:text-stone-500 font-cinzel">
                  | FLOWER OF TODAY
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-stone-400 max-w-sm leading-relaxed">
                비즈니스 행사와 브랜드의 위상에 품격을 더하는 프리미엄 B2B 플라워 아키텍처 스튜디오. 호텔 연회, 컨퍼런스, 사옥 스타일링 전문.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs text-slate-500 dark:text-stone-400 pt-2">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#c68a4c]" />
                  고객센터: 02-588-2940
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#c68a4c]" />
                  긴급 문의: 카카오톡 채널 @오늘의꽃
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <p className="font-bold text-slate-800 dark:text-stone-200 font-cinzel tracking-wider uppercase mb-2">
                QUICK LINKS
              </p>
              <p>
                <a className="text-slate-500 dark:text-stone-400 hover:text-[#c68a4c] transition-colors" href="#hero">
                  홈으로
                </a>
              </p>
              <p>
                <a className="text-slate-500 dark:text-stone-400 hover:text-[#c68a4c] transition-colors" href="#brand">
                  브랜드 철학
                </a>
              </p>
              <p>
                <a className="text-slate-500 dark:text-stone-400 hover:text-[#c68a4c] transition-colors" href="#portfolio">
                  포트폴리오
                </a>
              </p>
              <p>
                <a className="text-slate-500 dark:text-stone-400 hover:text-[#c68a4c] transition-colors" href="#service">
                  기업 솔루션
                </a>
              </p>
              <p>
                <a className="text-slate-500 dark:text-stone-400 hover:text-[#c68a4c] transition-colors" href="#inquiry">
                  주문 & 견적 문의
                </a>
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-500 dark:text-stone-400">
              <p className="font-bold text-slate-800 dark:text-stone-200 font-cinzel tracking-wider uppercase mb-2">
                STUDIO INFO
              </p>
              <p>상호명: 오늘의 꽃 (Flower of Today Corp.)</p>
              <p>사업자등록번호: 214-88-91024</p>
              <p>통신판매업신고: 제2024-서울강남-0312호</p>
              <p>스튜디오: 서울특별시 서초구 반포대로 22길 14, 1-2F</p>
            </div>
          </div>

          <div className="pt-8 border-t border-[#eae5dc] dark:border-[#2a3830] flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 dark:text-stone-500">
            <p>© 2025 오늘의 꽃 (Flower of Today). All rights reserved.</p>
            <p className="mt-2 sm:mt-0 font-cinzel tracking-wider">
              CRAFTED FOR EXECUTIVE CORPORATE EVENTS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
