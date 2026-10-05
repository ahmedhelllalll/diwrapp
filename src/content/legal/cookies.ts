import { LegalDocument, Locale } from './types';
import { LEGAL_CONFIG } from '@/config/legal';

export const cookiePolicyEn: LegalDocument = {
  slug: 'cookie-policy',
  category: 'Legal',
  title: 'Cookie Policy',
  intro:
    'This Cookie Policy explains how DiWrapp, operated by Distin-Gui Group, uses cookies, local browser storage, and related edge technologies on our website (diwrapp.com). We explain what these technologies are, why we use them, and your choices regarding their management.',
  effectiveDate: LEGAL_CONFIG.dates.effectiveDateEn,
  lastUpdated: LEGAL_CONFIG.dates.lastUpdatedEn,
  tableOfContentsTitle: 'In this article',
  sidebar: {
    title: 'Need to get in Touch?',
    description:
      'Have questions about our cookie usage, local browser storage, or privacy practices? Our technical and legal teams are here to help.',
    buttonText: 'Contact Us',
    buttonHref: '/contact',
  },
  sections: [
    {
      id: 'what-are-cookies',
      title: '1. What Are Cookies and Local Storage?',
      paragraphs: [
        'A cookie is a small text file placed on your computer or mobile device when you visit a website. Cookies allow websites to recognize your device, maintain security, remember user settings, and enable smooth page navigation.',
        'In addition to cookies, modern web applications utilize "Local Storage" (HTML5 localStorage), which stores preference data locally in your browser without transmitting it back to web servers on every HTTP request.',
      ],
    },
    {
      id: 'how-we-use-cookies',
      title: '2. How DiWrapp Uses Cookies and Storage',
      paragraphs: [
        'DiWrapp uses a minimal and privacy-focused storage footprint. We categorize our storage mechanisms into the following groups:',
        {
          subheading: 'A. Strictly Necessary First-Party Cookies',
          paragraphs: [
            'These cookies are essential for our website to operate securely and correctly. Without them, core functions such as country localization and user authentication cannot function:',
          ],
          list: [
            'di_country: Created by our Vercel edge proxy function upon incoming request. Stores your detected two-letter country code (e.g. "sa", "ae", "sd", "us", "gb") for 7 days to deliver localized interface settings, phone formats, and country badges. It does not track personal browsing habits.',
            'diwrapp_session: When an authenticated session is active, this cookie stores a secure session token with a 7-day lifespan to verify your login status and protect authenticated routes.',
          ],
        },
        {
          subheading: 'B. Functional & Preference Storage (localStorage)',
          paragraphs: [
            'These items store your personal user interface preferences directly within your browser:',
          ],
          list: [
            'theme: Stores your preferred visual theme ("light" or "dark") so the site consistently renders in your chosen mode across visits.',
            'diwrapp_user: Temporarily stores user profile draft data (name, email, selected role) during registration preview flows.',
          ],
        },
        {
          subheading: 'C. Performance and Analytics',
          paragraphs: [
            'DiWrapp currently does not load third-party analytics cookies, advertising tracking pixels, or cross-site tracking beacons (such as Google Analytics or Meta Pixel). Any future integration of telemetry tools will be strictly vetted and updated in this policy.',
          ],
        },
      ],
    },
    {
      id: 'third-party-services',
      title: '3. Third-Party Services and Edge Infrastructure',
      paragraphs: [
        'Our web application is deployed on the global cloud infrastructure provided by Vercel Inc. When your browser requests our website, Vercel inspects network IP routing in transient memory at the edge server closest to you to determine the approximate country of origin, setting the di_country cookie accordingly. Raw IP addresses are not stored or commercialized by DiWrapp.',
      ],
    },
    {
      id: 'managing-cookies',
      title: '4. How to Manage and Control Cookies',
      paragraphs: [
        'You have the right to accept, reject, or delete browser cookies at any time through your web browser settings. Most browsers allow you to view existing cookies, clear all stored cookies, or configure automatic blocking for third-party cookies.',
        'Please note that if you disable or clear strictly necessary cookies (such as di_country or diwrapp_session), certain localized features, authentication persistence, and interface capabilities may not function as intended.',
      ],
    },
    {
      id: 'changes-to-cookie-policy',
      title: '5. Changes to This Cookie Policy',
      paragraphs: [
        'We may update this Cookie Policy periodically to reflect changes in the cookies we use, technical updates, or applicable legal and regulatory standards. Any modifications will be posted directly on this page with an updated "Last Updated" date.',
      ],
    },
    {
      id: 'contact-us',
      title: '6. Contact Us',
      paragraphs: [
        'If you have any questions regarding our use of cookies or client-side storage technologies, please contact our privacy team:',
        {
          list: [
            `Company: ${LEGAL_CONFIG.company.legalName}`,
            `Parent Group: ${LEGAL_CONFIG.company.parentGroup}`,
            `Address: ${LEGAL_CONFIG.company.headquartersAddress.street}, ${LEGAL_CONFIG.company.headquartersAddress.district}, ${LEGAL_CONFIG.company.headquartersAddress.city}, ${LEGAL_CONFIG.company.headquartersAddress.country}`,
            `Privacy Inquiries: ${LEGAL_CONFIG.contact.privacyEmail}`,
            `General Inquiries: ${LEGAL_CONFIG.contact.generalEmail}`,
          ],
        },
      ],
    },
  ],
  relatedDocsTitle: 'Related Legal Documents',
  relatedDocs: [
    {
      title: 'Privacy Policy',
      description: 'Learn how DiWrapp collects, stores, and protects personal data across all marketing, inquiry, and onboarding services.',
      href: '/privacy-policy',
    },
    {
      title: 'Terms & Conditions',
      description: 'Review the contractual terms governing use of the DiWrapp marketplace, advertiser duties, and supplier standards.',
      href: '/terms-and-conditions',
    },
  ],
};

export const cookiePolicyAr: LegalDocument = {
  slug: 'cookie-policy',
  category: 'وثيقة قانونية',
  title: 'سياسة ملفات تعريف الارتباط',
  intro:
    'توضح سياسة ملفات تعريف الارتباط هذه كيفية استخدام منصة دي-راب (DiWrapp)، المشغلة من قبل مجموعة ديستين-جاي (Distin-Gui Group)، لملفات تعريف الارتباط ووحدات التخزين المحلي في متصفحك عبر الموقع الإلكتروني (diwrapp.com). ونبين هنا ماهية هذه التقنيات، وأسباب استخدامها، وخياراتك في إدارتها.',
  effectiveDate: LEGAL_CONFIG.dates.effectiveDateAr,
  lastUpdated: LEGAL_CONFIG.dates.lastUpdatedAr,
  tableOfContentsTitle: 'في هذه الوثيقة',
  sidebar: {
    title: 'هل تحتاج إلى مساعدة؟',
    description:
      'هل لديك استفسار حول استخدام ملفات تعريف الارتباط أو حفظ التفضيلات في المتصفح؟ فريقنا التقني والقانوني مستعد لمساعدتك.',
    buttonText: 'تواصل معنا',
    buttonHref: '/contact',
  },
  sections: [
    {
      id: 'what-are-cookies',
      title: '1. ما هي ملفات تعريف الارتباط والتخزين المحلي؟',
      paragraphs: [
        'ملف تعريف الارتباط (Cookie) هو ملف نصي صغير يُحفظ على جهاز الحاسوب أو الهاتف الذكي عند زيارة موقع إلكتروني. تتيح هذه الملفات للموقع التعرف على جهازك، وحفظ تفضيلاتك، وتأمين جلسة التصفح، وتحسين سلاسة الانتقال بين الصفحات.',
        'بالإضافة إلى ذلك، تعتمد تطبيقات الويب الحديثة على "التخزين المحلي" (HTML5 localStorage)، وهي تقنية تتيح حفظ التفضيلات داخل متصفح المستخدم محلياً دون الحاجة لإرسالها مع كل طلب إلى خوادم الموقع.',
      ],
    },
    {
      id: 'how-we-use-cookies',
      title: '2. استخدامات ملفات الارتباط في دي-راب',
      paragraphs: [
        'تلتزم دي-راب بنهج تقني يحترم الخصوصية ويقتصر على الملفات الضرورية للغاية لتشغيل النظام. ونقسم هذه الملفات إلى الفئات التالية:',
        {
          subheading: 'أ. ملفات تعريف ارتباط أولية وضرورية للغاية',
          paragraphs: [
            'تُعد هذه الملفات جوهرية لتشغيل الموقع وتقديم الخدمات الأساسية بأمان، ولا يمكن للموقع العمل بدونها:',
          ],
          list: [
            'di_country: يتم إنشاؤه بواسطة خوادم الحوسبة الطرفية على Vercel عند بدء الاتصال. ويخزن رمز الدولة المكتشف المكون من حرفين (مثل: "sa" للمملكة العربية السعودية، أو "ae" للإمارات) لمدة 7 أيام؛ وذلك لتقديم واجهة ملائمة جغرافياً وعرض شارة الدولة. ولا يُستخدم هذا الملف لتتبع نشاطك الشخصي.',
            'diwrapp_session: يُستخدم عند تسجيل الدخول لحفظ رمز الجلسة الآمن بمدة صلاحية 7 أيام، مما يتيح استمرار تسجيل الدخول وحماية الصفحات المخصصة.',
          ],
        },
        {
          subheading: 'ب. سجلات التخزين المحلي للتفضيلات (localStorage)',
          paragraphs: [
            'تُحفظ هذه العناصر مباشرة في ذاكرة متصفحك المحلي لتحسين تجربة التصفح:',
          ],
          list: [
            'theme: يحفظ خيارك المفضل للمظهر البصري ("الوضع الفاتح" أو "الوضع الداكن") ليظهر الموقع وفق اختيارك في كل زيارة.',
            'diwrapp_user: يحفظ مسودة بيانات المستخدم (الاسم، البريد الإلكتروني، ونوع الحساب المختار) مؤقتاً خلال مراحل التسجيل التجريبية.',
          ],
        },
        {
          subheading: 'ج. التحليلات والتتبع الإعلاني',
          paragraphs: [
            'لا يحتوي موقع دي-راب حالياً على أي ملفات ارتباط تابعة لأطراف ثالثة لأغراض التتبع الإعلاني أو إعادة الاستهداف التجاري (مثل Google Analytics أو Meta Pixel). وسيتم الإفصاح عن أي أدوات تحليلية يتم اعتمادها مستقبلاً في هذه السياسة.',
          ],
        },
      ],
    },
    {
      id: 'third-party-services',
      title: '3. الخدمات السحابية والبنية الطرفية',
      paragraphs: [
        'يتم تشغيل موقعنا واستضافته على البنية السحابية العالمية لشركة Vercel Inc. وتتولى الخوادم الطرفية فحص رمز الدولة التقديري لعنوان IP في الذاكرة اللحظية دون تخزين عنوان IP الدائم في قواعد بياناتنا، بما يحفظ خصوصيتك الكاملة.',
      ],
    },
    {
      id: 'managing-cookies',
      title: '4. كيفية إدارة وتعطيل ملفات تعريف الارتباط',
      paragraphs: [
        'يحق لك في أي وقت قبول أو رفض أو حذف ملفات تعريف الارتباط عبر إعدادات متصفح الإنترنت الخاص بك. وتتيح معظم المتصفحات إمكانية مسح الملفات المحفوظة أو منع حفظ ملفات جديدة.',
        'يرجى ملاحظة أن تعطيل ملفات تعريف الارتباط الضرورية (مثل di_country أو diwrapp_session) قد يؤدي إلى تعذر استخدام بعض خصائص الموقع بالشكل المطلوب، مثل ثبات جلسة الدخول وتخصيص الدولة.',
      ],
    },
    {
      id: 'changes-to-cookie-policy',
      title: '5. التحديثات على سياسة ملفات تعريف الارتباط',
      paragraphs: [
        'نحتفظ بالحق في تحديث هذه السياسة كلما دعت الحاجة التقنية أو التنظيمية. وسيتم إدراج أي تعديل مع تحديث تاريخ "آخر تحديث" في أعلى هذه الصفحة.',
      ],
    },
    {
      id: 'contact-us',
      title: '6. التواصل والاستفسارات',
      paragraphs: [
        'إذا كانت لديك أي أسئلة حول كيفية تعاملنا مع ملفات تعريف الارتباط أو تقنيات التخزين المحلي، يرجى التواصل معنا عبر البريد الإلكتروني:',
        {
          list: [
            `المنشأة: ${LEGAL_CONFIG.company.legalName}`,
            `المجموعة المالكة: ${LEGAL_CONFIG.company.parentGroup}`,
            `العنوان: ${LEGAL_CONFIG.company.headquartersAddress.street}، ${LEGAL_CONFIG.company.headquartersAddress.district}، ${LEGAL_CONFIG.company.headquartersAddress.city}، ${LEGAL_CONFIG.company.headquartersAddress.country}`,
            `بريد الخصوصية: ${LEGAL_CONFIG.contact.privacyEmail}`,
            `البريد العام: ${LEGAL_CONFIG.contact.generalEmail}`,
          ],
        },
      ],
    },
  ],
  relatedDocsTitle: 'وثائق قانونية ذات صلة',
  relatedDocs: [
    {
      title: 'سياسة الخصوصية',
      description: 'اطّلع على المبادئ الشاملة لجمع وحماية البيانات الشخصية المطبقة في منصة دي-راب.',
      href: '/privacy-policy',
    },
    {
      title: 'الشروط والأحكام',
      description: 'تعرّف على الشروط التعاقدية العامة التي تنظم حقوق ومسؤوليات المُعلنين ومزودي الشاشات.',
      href: '/terms-and-conditions',
    },
  ],
};

export function getCookiePolicy(lang: Locale): LegalDocument {
  return lang === 'ar' ? cookiePolicyAr : cookiePolicyEn;
}
