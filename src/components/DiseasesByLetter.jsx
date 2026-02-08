import React, { useState } from 'react'
import ScrollReveal from './ScrollReveal'
import {
  getDiseasesByLetter,
  getAvailableLetters,
  AR_LETTERS,
  EN_LETTERS
} from '../data/diseasesByLetter'

const TAB_AR = 'ar'
const TAB_EN = 'en'

const DiseasesByLetter = () => {
  const [lang, setLang] = useState(TAB_AR)
  const [selectedLetter, setSelectedLetter] = useState(null)

  const letters = lang === TAB_AR ? getAvailableLetters(TAB_AR) : getAvailableLetters(TAB_EN)
  const allLettersForGrid = lang === TAB_AR ? AR_LETTERS : EN_LETTERS
  const diseases = selectedLetter ? getDiseasesByLetter(lang, selectedLetter) : []

  return (
    <ScrollReveal variant="up">
      <section
        className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden"
        style={{ direction: lang === TAB_AR ? 'rtl' : 'ltr' }}
      >
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#1D5E78]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          {/* عنوان القسم */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 bg-[#1D5E78]/10 rounded-full text-[#1D5E78] font-semibold text-sm mb-4">
              {lang === TAB_AR ? 'موسوعة الأمراض' : 'Diseases Encyclopedia'}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b304a] mb-2">
              {lang === TAB_AR ? 'ابحث عن الأمراض بالحرف الأول' : 'Search diseases by first letter'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {lang === TAB_AR
                ? 'اختر اللغة ثم الحرف لعرض قائمة بالأمراض وشرح مختصر لكل مرض.'
                : 'Choose language and a letter to see a list of diseases with a short description for each.'}
            </p>
          </div>

          {/* تاب: عربي / إنجليزي */}
          <div className="flex justify-center gap-2 mb-8">
            <button
              onClick={() => { setLang(TAB_AR); setSelectedLetter(null) }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                lang === TAB_AR
                  ? 'bg-[#1D5E78] text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1D5E78]/50'
              }`}
            >
              بحث بالعربي
            </button>
            <button
              onClick={() => { setLang(TAB_EN); setSelectedLetter(null) }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                lang === TAB_EN
                  ? 'bg-[#1D5E78] text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1D5E78]/50'
              }`}
            >
              English
            </button>
          </div>

          {/* شبكة الحروف */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {allLettersForGrid.map((letter) => {
              const hasData = letters.includes(letter)
              const isSelected = selectedLetter === letter
              return (
                <button
                  key={letter}
                  onClick={() => hasData && setSelectedLetter(letter)}
                  disabled={!hasData}
                  className={`w-10 h-10 rounded-xl font-bold text-lg transition-all ${
                    !hasData
                      ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                      : isSelected
                        ? 'bg-[#1D5E78] text-white shadow-lg scale-110'
                        : 'bg-white text-[#1D5E78] border border-[#1D5E78]/30 hover:bg-[#1D5E78]/10 hover:border-[#1D5E78]'
                  }`}
                >
                  {letter}
                </button>
              )
            })}
          </div>

          {/* قائمة الأمراض */}
          {selectedLetter && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-[#0b304a] mb-4">
                {lang === TAB_AR ? `أمراض تبدأ بحرف "${selectedLetter}"` : `Diseases starting with "${selectedLetter}"`}
                <span className="text-gray-500 font-normal text-base mr-2">
                  ({diseases.length} {lang === TAB_AR ? 'مرض' : 'diseases'})
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {diseases.map((d, idx) => (
                  <ScrollReveal key={idx} delay={idx * 0.05} variant="up">
                    <article className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg hover:border-[#1D5E78]/20 transition-all">
                      <h4 className="text-lg font-bold text-[#1D5E78] mb-2">{d.name}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{d.description}</p>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}

          {selectedLetter && diseases.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              {lang === TAB_AR ? 'لا توجد أمراض مسجّلة لهذا الحرف حالياً.' : 'No diseases listed for this letter yet.'}
            </p>
          )}
        </div>
      </section>
    </ScrollReveal>
  )
}

export default DiseasesByLetter
