import { LegalDocument, Locale } from './types';
import { LEGAL_CONFIG } from '@/config/legal';

export const privacyPolicyEn: LegalDocument = {
  slug: 'privacy-policy',
  category: 'Legal',
  title: 'Privacy Policy',
  intro:
    'This Privacy Policy describes how DiWrapp, operated by Distin-Gui Group, collects, uses, stores, and protects personal data when you access our website, submit inquiries, register for an account, apply as a screen supplier, or interact with our digital out-of-home (DOOH) advertising marketplace.',
  effectiveDate: LEGAL_CONFIG.dates.effectiveDateEn,
  lastUpdated: LEGAL_CONFIG.dates.lastUpdatedEn,
  tableOfContentsTitle: 'In this article',
  sidebar: {
    title: 'Need to get in Touch?',
    description:
      'Have questions about how we handle your personal data, or wish to exercise your data subject rights? Our team is here to assist you.',
    buttonText: 'Contact Us',
    buttonHref: '/contact',
  },
  sections: [
    {
      id: 'who-we-are',
      title: '1. Who We Are and Scope',
      paragraphs: [
        'DiWrapp is a multi-country digital out-of-home (DOOH) advertising marketplace operated by Distin-Gui Group, headquartered in Riyadh, Kingdom of Saudi Arabia. We connect advertisers looking to book high-impact digital screens with media suppliers who own or operate digital display inventory.',
        'This Privacy Policy applies to personal information collected through the DiWrapp website (diwrapp.com), partner and vendor onboarding portals, contact forms, and related online communication channels. This document serves as a draft for legal review prior to full commercial availability.',
      ],
    },
    {
      id: 'data-we-collect',
      title: '2. Personal Data We Collect',
      paragraphs: [
        'We collect only the personal data reasonably necessary to provide our digital marketplace services, respond to commercial inquiries, and manage supplier applications. The types of data we collect include:',
        {
          subheading: 'A. Data You Provide Directly to Us',
          list: [
            'Contact and Inquiry Information: When you fill out our contact form or request information, we collect your full name, email address, international country calling code, phone number, subject, and the contents of your message.',
            'Vendor and Supplier Onboarding Data: When applying to list screens on our marketplace, we collect your organization name, legal ownership structure (e.g. corporate or individual), official website, company bio, uploaded brand logos and company profile documents, screen inventory specifications (quantities, formats, operating countries, and cities), primary contact person name, job title, work email, and direct phone number.',
            'User Account Information: When registering an account, we collect your name, email address, password, and designated role (advertiser or media supplier). During our current pre-launch stage, account creation flows are stored locally in your browser session for preview purposes and redirect to platform launch notices.',
            'Business and Billing Details (Forward-Looking): As commercial booking and wallet capabilities become live, we will collect authorized invoicing contacts, commercial registration copies, and transaction records required for billing compliance.',
          ],
        },
        {
          subheading: 'B. Data Collected Automatically',
          list: [
            'Approximate Geolocation (Country Level): When your browser connects to our edge infrastructure on Vercel, incoming request headers are used in volatile memory to detect your two-letter country code (for example: SA, AE, SD, US, GB). We do not record your precise GPS coordinates, nor do we retain full raw IP addresses in application databases.',
            'Device and Technical Metadata: Standard HTTP network request headers, including browser type, operating system, referrer URL, preferred language, and client timestamp.',
            'Local Storage and Cookies: We store your interface preferences (such as light or dark theme mode) in your browser’s localStorage, and store your detected country code and session status in strictly necessary first-party cookies.',
          ],
        },
      ],
    },
    {
      id: 'how-we-use-data',
      title: '3. How We Use Your Personal Data',
      paragraphs: [
        'We use the personal information collected on our website and marketplace strictly for legitimate operational purposes, including:',
        {
          list: [
            'Processing and evaluating supplier screen onboarding applications and verifying media inventory eligibility.',
            'Responding promptly to customer service requests, partnership inquiries, and platform feedback.',
            'Delivering localized marketplace content, regional currency indicators, and language preferences (English or Arabic).',
            'Facilitating advertiser campaign bookings, screen reservations, and automated campaign proofs upon full platform rollout.',
            'Ensuring platform security, investigating unauthorized activity, preventing fraudulent bookings, and maintaining system integrity.',
            'Fulfilling accounting, tax, and reporting obligations under applicable corporate laws.',
          ],
        },
      ],
    },
    {
      id: 'data-sharing',
      title: '4. Sharing and Disclosure of Information',
      paragraphs: [
        'DiWrapp does not sell, rent, or trade your personal data to third parties for independent marketing purposes. We share your information solely under the following limited circumstances:',
        {
          list: [
            'Cloud Infrastructure & Hosting Providers: We host our web application on Vercel Inc. and deploy our API backend on secure enterprise cloud servers. These service providers act strictly as data processors under contractual confidentiality and data security obligations.',
            'Advertisers and Media Suppliers: When an advertiser confirms a screen campaign booking, essential business contact and operational details may be shared with the screen supplier to ensure campaign execution, creative validation, and proof of display.',
            'Legal and Regulatory Authorities: We may disclose personal data if required by binding subpoena, court order, or official governmental directive issued by a competent court or regulatory body under applicable law.',
            'Corporate Reorganization: In the event of a merger, acquisition, corporate restructuring, or asset transfer involving Distin-Gui Group, customer information may be transferred as an operational business asset subject to this Privacy Policy.',
          ],
        },
      ],
    },
    {
      id: 'international-transfers',
      title: '5. International Data Transfers',
      paragraphs: [
        'DiWrapp operates as a regional and cross-border digital marketplace. While our operational headquarters is in Riyadh, Saudi Arabia, our cloud edge servers and technical infrastructure may process data across multiple geographic regions where our hosting providers maintain enterprise data centers.',
        'Whenever personal data is transferred across international borders, we ensure adequate contractual, organizational, and technical safeguards are maintained pursuant to applicable data protection laws.',
      ],
    },
    {
      id: 'data-retention',
      title: '6. Data Retention',
      paragraphs: [
        `We retain personal data only for as long as necessary to fulfill the purposes for which it was gathered, including responding to inquiries, reviewing supplier inventory, providing customer support, and complying with statutory record-keeping rules.`,
        `[TO CONFIRM: ${LEGAL_CONFIG.operational.standardDataRetentionPeriod}]. Once the applicable retention window expires, personal records are permanently deleted, overwritten, or irreversibly anonymized.`,
      ],
    },
    {
      id: 'data-security',
      title: '7. Information Security',
      paragraphs: [
        'We implement commercially reasonable administrative, technical, and physical safeguards designed to protect personal information against unauthorized access, loss, misuse, or alteration. These measures include encrypted communications (HTTPS/TLS 1.3), edge network security firewalls, strict role-based data access controls, and parameterized database queries.',
        'However, no method of transmission over the Internet or electronic storage is completely impenetrable. While we strive to protect your personal information, we cannot guarantee absolute, unconditional security.',
      ],
    },
    {
      id: 'your-rights',
      title: '8. Your Rights and How to Exercise Them',
      paragraphs: [
        'Subject to applicable data protection laws in your jurisdiction, you may have legal rights regarding your personal information, including:',
        {
          list: [
            'Right to Access: You may request confirmation of whether we process your data and receive an accessible copy.',
            'Right to Rectification: You may request the correction of inaccurate, incomplete, or outdated personal details.',
            'Right to Destruction / Erasure: You may request the deletion of your personal records where no overriding legal or regulatory obligation requires retention.',
            'Right to Withdraw Consent: Where data processing relies on your consent, you may withdraw it at any time with future effect.',
            'Right to Object / Restrict: You may object to specific processing activities conducted on the basis of legitimate business interest.',
          ],
        },
        `To exercise any of these statutory rights, please submit a written request to our privacy team at ${LEGAL_CONFIG.contact.privacyEmail}. We will review and respond to verified requests within the statutory timeframe mandated by applicable regulations.`,
      ],
    },
    {
      id: 'children-privacy',
      title: "9. Children's Privacy",
      paragraphs: [
        `DiWrapp is a professional business-to-business (B2B) digital advertising marketplace intended solely for commercial entities and individuals who have reached the age of legal majority (${LEGAL_CONFIG.operational.minimumAge} years of age). We do not knowingly solicit or collect personal information from minors. If you believe a minor has submitted personal data to us, please notify us immediately so we can promptly delete the record.`,
      ],
    },
    {
      id: 'cookies-and-tracking',
      title: '10. Cookies and Client-Side Storage',
      paragraphs: [
        'Our website uses strictly necessary cookies and local storage items essential for core navigation, country detection, session security, and theme rendering. We do not currently deploy third-party advertising tracking pixels or commercial retargeting scripts.',
        'For detailed technical information on each cookie and storage key we utilize, please review our dedicated Cookie Policy.',
      ],
    },
    {
      id: 'changes-to-policy',
      title: '11. Changes to This Privacy Policy',
      paragraphs: [
        'We may periodically update this Privacy Policy to reflect platform enhancements, operational modifications, or changes in applicable data protection laws. When revisions are published, we will update the "Last Updated" date at the top of this document. We encourage you to review this page regularly to stay informed about our data protection practices.',
      ],
    },
    {
      id: 'contact-us',
      title: '12. Contact Information',
      paragraphs: [
        'If you have questions, comments, or formal requests regarding this Privacy Policy or DiWrapp’s data handling practices, please contact our legal and privacy team:',
        {
          list: [
            `Company: ${LEGAL_CONFIG.company.legalName} (${LEGAL_CONFIG.company.parentGroup})`,
            `Address: ${LEGAL_CONFIG.company.headquartersAddress.street}, ${LEGAL_CONFIG.company.headquartersAddress.district}, ${LEGAL_CONFIG.company.headquartersAddress.city}, ${LEGAL_CONFIG.company.headquartersAddress.country}`,
            `Commercial Registration: ${LEGAL_CONFIG.company.commercialRegistrationNumber}`,
            `Privacy & Legal Inquiries: ${LEGAL_CONFIG.contact.privacyEmail} / ${LEGAL_CONFIG.contact.legalEmail}`,
            `General Inquiries: ${LEGAL_CONFIG.contact.generalEmail}`,
            `Telephone: ${LEGAL_CONFIG.contact.phone}`,
          ],
        },
      ],
    },
  ],
  relatedDocsTitle: 'Related Legal Documents',
  relatedDocs: [
    {
      title: 'Terms & Conditions',
      description: 'Review the contractual terms governing use of the DiWrapp DOOH marketplace, advertiser obligations, and supplier rules.',
      href: '/terms-and-conditions',
    },
    {
      title: 'Cookie Policy',
      description: 'Learn about the first-party cookies, local storage keys, and edge country detection tokens utilized by DiWrapp.',
      href: '/cookie-policy',
    },
  ],
};

export const privacyPolicyAr: LegalDocument = {
  slug: 'privacy-policy',
  category: 'وثيقة قانونية',
  title: 'سياسة الخصوصية',
  intro:
    'توضح سياسة الخصوصية هذه كيفية قيام منصة دي-راب (DiWrapp)، المشغلة من قبل مجموعة ديستين-جاي (Distin-Gui Group)، بجمع بياناتك الشخصية واستخدامها وحفظها وحمايتها عند زيارة موقعنا الإلكتروني، أو إرسال استفسار، أو تسجيل حساب، أو تقديم طلب انضمام كمزوّد شاشات، أو التعامل مع سوق الإعلانات الرقمية خارج المنزل (DOOH).',
  effectiveDate: LEGAL_CONFIG.dates.effectiveDateAr,
  lastUpdated: LEGAL_CONFIG.dates.lastUpdatedAr,
  tableOfContentsTitle: 'في هذه الوثيقة',
  sidebar: {
    title: 'هل تحتاج إلى مساعدة؟',
    description:
      'هل لديك أي استفسار حول كيفية تعاملنا مع بياناتك الشخصية، أو ترغب في ممارسة حقوقك النظامية؟ فريقنا القانوني والدعم متاح لمساعدتك دائماً.',
    buttonText: 'تواصل معنا',
    buttonHref: '/contact',
  },
  sections: [
    {
      id: 'who-we-are',
      title: '1. من نحن ونطاق التطبيق',
      paragraphs: [
        'منصة دي-راب (DiWrapp) هي سوق رقمي إقليمي للإعلانات الرقمية خارج المنزل (DOOH)، تُشغلها وتملكها مجموعة ديستين-جاي الكائن مقرها في مدينة الرياض بالمملكة العربية السعودية. نوفر الربط التقني بين المُعلنين الراغبين في حجز مساحات إعلانية وشاشات رقمية، وبين مورّدي ومُلاك الشاشات الرقمية الراغبين في تسويق مساحاتهم.',
        'تسري هذه السياسة على كافة البيانات الشخصية التي يتم جمعها عبر الموقع الإلكتروني (diwrapp.com)، ونماذج التواصل، وبوابات تسجيل المورّدين والمُعلنين، وقنوات الدعم المعتمدة. تُعد هذه الوثيقة مسودة موجهة للمراجعة والاعتماد القانوني قبل الإطلاق التجاري الشامل.',
      ],
    },
    {
      id: 'data-we-collect',
      title: '2. البيانات الشخصية التي نجمعها',
      paragraphs: [
        'نحرص على جمع البيانات الشخصية الضرورية فقط لتقديم خدمات السوق الرقمي، ومتابعة استفسارات العملاء، والتحقق من طلبات انضمام الشركاء. وتشمل فئات البيانات ما يلي:',
        {
          subheading: 'أ. بيانات تقدمها لنا مباشرة',
          list: [
            'بيانات التواصل والاستفسارات: عند تعبئة نموذج "تواصل معنا" أو مراسلتنا، نجمع الاسم الكامل، وعنوان البريد الإلكتروني، ورمز الدولة الهاتفي، ورقم الهاتف، وموضوع الرسالة، ومحتواها.',
            'بيانات تسجيل مزودي الشاشات (المورّدين): عند تقديم طلب إدراج شاشات إعلانية، نجمع اسم المنشأة أو الشركة، ونوع الملكية (فردية أو شركة)، والموقع الإلكتروني الرسمي، والنبذة التعريفية، والشعار والملف التعريفي المرفوعين، وتفاصيل المخزون الإعلاني (أعداد الشاشات وأنواعها والدول والمدن التشغيلية)، بالإضافة إلى اسم مسؤول التواصل ومنصبه وبريده ورقم هاتفه.',
            'بيانات الحساب الشخصي: عند التسجيل في المنصة، نجمع الاسم والبريد الإلكتروني وكلمة المرور ونوع الحساب المختار (مُعلن أو مُورّد). وخلال مرحلة الإطلاق التجريبي الحالية، تُحفظ بيانات التسجيل محلياً في متصفحك لغايات المعاينة وتوجيهك لصفحات التحديثات.',
            'البيانات التجارية والمالية (أحكام مستقبلية): مع اكتمال تشغيل بوابات الحجز والمحفظة الرقمية، سنجمع بيانات السجل التجاري والبيانات الضريبية ومعلومات الدفع الضرورية لإصدار الفواتير النظامية.',
          ],
        },
        {
          subheading: 'ب. بيانات يتم جمعها تلقائياً',
          list: [
            'الموقع الجغرافي التقريبي (على مستوى الدولة): عند اتصال متصفحك بخوادمنا السحابية على منصة Vercel، تُحلل ترويسات الاتصال في الذاكرة المؤقتة لاستنتاج رمز دولتك التشغيلي المكون من حرفين (مثل: SA، AE، SD، US، GB). نحن لا نسجل إحداثيات GPS الدقيقة لجهازك، ولا نخزن عنوان IP الكامل في قواعد بيانات التطبيق.',
            'بيانات الجهاز والاتصال الفني: ترويسات بروتوكول HTTP القياسية، بما في ذلك نوع المتصفح، ونظام التشغيل، والصفحة المحيلة، وإعدادات اللغة المفضلة، والتوقيت الزمني للطلب.',
            'ملفات تعريف الارتباط والتخزين المحلي: نستخدم وحدة التخزين المحلي (localStorage) لحفظ تفضيل مظهر الواجهة (الوضع الليلي أو الفاتح)، كما نستخدم ملفات ارتباط أولية ضرورية لحفظ رمز الدولة وحالة جلسة الدخول.',
          ],
        },
      ],
    },
    {
      id: 'how-we-use-data',
      title: '3. أغراض استخدام البيانات الشخصية',
      paragraphs: [
        'نستخدم البيانات الشخصية التي نجمعها للأغراض التشغيلية المشروعة حصراً، وتشمل:',
        {
          list: [
            'دراسة وتقييم طلبات انضمام مورّدي الشاشات الرقمية والتأكد من مطابقتها للمعايير الفنية والجغرافية.',
            'الرد على طلبات الدعم الفني، واستفسارات الأسعار، ومقترحات الشراكة التجارية.',
            'تخصيص تجربة تصفح المنصة وفقاً للغة المختارة (العربية أو الإنجليزية) والدولة الجغرافية والعملة المعمول بها.',
            'تمكين إجراءات حجز الحملات الإعلانية، وتأكيد جدولة العروض، وإرسال تقارير إثبات العرض الرقمي عند إتاحة النظام التشغيلي بالكامل.',
            'حماية أمن المنصة، ومكافحة الاحتيال أو الحجوزات الوهمية، والتحقق من سلامة العمليات الرقمية.',
            'الامتثال للالتزامات المحاسبية والضريبية والنظامية المفروضة بموجب الأنظمة السارية.',
          ],
        },
      ],
    },
    {
      id: 'data-sharing',
      title: '4. مشاركة البيانات والإفصاح عنها',
      paragraphs: [
        'تلتزم دي-راب بعدم بيع أو تأجير أو المتاجرة ببياناتك الشخصية لأي طرف ثالث لأغراض التسويق المستقل. ونحن نشارك بياناتك فقط في الحالات المحددة التالية:',
        {
          list: [
            'مقدمو البنية التحتية والخدمات السحابية: نستضيف الموقع على شبكة Vercel وتطبيقات قواعد البيانات السحابية الموثوقة، وتعمل هذه الأطراف كمعالجي بيانات ملزمين تعاقدياً بأعلى معايير السرية والأمان الفني.',
            'المُعلنون ومُلاك الشاشات الشركاء: عند إتمام حجز إعلاني، يتم تبادل بيانات التواصل التشغيلية الأساسية بين المُعلن والمورّد المعني لتنفيذ الحملة ومراجعة المحتوى الإعلاني والتأكد من البث.',
            'الجهات الرسمية والتنظيمية: يجوز الإفصاح عن البيانات متى كان ذلك مطلوباً بموجب أمر قضائي، أو خطاب رسمي ملزم صادر من جهة حكومية أو رقابية مختصة وفقاً للأنظمة المعمول بها.',
            'إعادة الهيكلة أو نقل الملكية: في حال اندماج مجموعة ديستين-جاي، أو الاستحواذ عليها، أو بيع جزء من أصولها، قد تنتقل بيانات العملاء كجزء من الأصول التشغيلية شريطة التزام الكيان الجديد بسياسة الخصوصية هذه.',
          ],
        },
      ],
    },
    {
      id: 'international-transfers',
      title: '5. نقل البيانات عبر الحدود',
      paragraphs: [
        'تعمل دي-راب كسوق رقمي إقليمي ودولي يربط أسواقاً متعددة. ورغم أن مقر الإدارة يقع في الرياض بالمملكة العربية السعودية، إلا أن بنيتنا السحابية وخوادم الحوسبة الطرفية قد تعالج البيانات عبر مراكز بيانات تابعة لمزودي الخدمة في مناطق دولية متعددة.',
        'وفي كافة حالات نقل البيانات دولياً، نحرص على تطبيق ضمانات تعاقدية وفنية كافية تكفل استمرار توفير مستوى حماية لا يقل عن متطلبات الأنظمة واللوائح المعمول بها لحماية البيانات الشخصية.',
      ],
    },
    {
      id: 'data-retention',
      title: '6. مدة الاحتفاظ بالبيانات',
      paragraphs: [
        'نحتفظ ببياناتك الشخصية فقط للفترة الزمنية الضرورية لتحقيق الأغراض التي جُمعت من أجلها، بما في ذلك خدمة حسابك، وتلبية المتطلبات النظامية والمحاسبية، وتسوية أي نزاعات قائمة.',
        `[TO CONFIRM: ${LEGAL_CONFIG.operational.standardDataRetentionPeriod}]. وعند انتهاء المدة النظامية، يتم إتلاف البيانات بصورة آمنة أو حذفها نهائياً أو تجريدها من أي دلالة تعريفية بصفة لا رجعة فيها.`,
      ],
    },
    {
      id: 'data-security',
      title: '7. أمن وسلامة البيانات',
      paragraphs: [
        'نطبق تدابير وإجراءات حماية تقنية وتنظيمية معقولة تجارياً لحماية البيانات الشخصية من الوصول غير المصرح به، أو التعديل، أو الإفصاح، أو التلف. وتشمل هذه التدابير تشفير حركة البيانات عبر بروتوكولات HTTPS/TLS، واستخدام جدران الحماية للشبكات، وحصر صلاحيات الوصول على الموظفين المخولين فقط.',
        'ومع ذلك، يُقر المستخدم بأنه لا توجد وسيلة نقل عبر الإنترنت أو وسيلة تخزين إلكتروني آمنة بنسبة مائة بالمائة؛ لذا فإننا نسعى لحماية بياناتك بأقصى درجات العناية المهنية دون تقديم ضمانات مطلقة تعفي من الحوادث القاهرة خارج السيطرة المنطقية.',
      ],
    },
    {
      id: 'your-rights',
      title: '8. حقوقك النظامية وكيفية ممارستها',
      paragraphs: [
        'بموجب الأنظمة واللوائح المعمول بها لحماية البيانات في نطاق اختصاصك، يحق لك التمتع بعدد من الحقوق القانونية، ومن أبرزها:',
        {
          list: [
            'حق العلم والوصول: معرفة السند النظامي لمعالجة بياناتك والحصول على نسخة واضحة منها.',
            'حق التصحيح والاستكمال: طلب تعديل أي بيانات غير صحيحة، أو تحديث البيانات الناقصة أو القديمة.',
            'حق الإتلاف والمحو: طلب حذف بياناتك الشخصية في الحالات التي تنتفي فيها الحاجة لمعالجتها وما لم يكن هناك مانع نظامي أو التزام قانوني بالاحتفاظ بها.',
            'حق سحب الموافقة: في العمليات القائمة على موافقتك الصريحة، يحق لك سحب موافقتك في أي وقت دون أن يؤثر ذلك على مشروعية المعالجة السابقة.',
            'حق الاعتراض: الاعتراض على معالجة بياناتك لأغراض معينة تستند إلى المصلحة المشروعة.',
          ],
        },
        `لممارسة أي من هذه الحقوق، يُرجى مراسلة مسؤول حماية البيانات عبر البريد الإلكتروني: ${LEGAL_CONFIG.contact.privacyEmail}. وسنتولى معالجة طلبك والرد عليه خلال المدة النظامية المحددة بالأنظمة السارية.`,
      ],
    },
    {
      id: 'children-privacy',
      title: '9. خصوصية القُصّر والأطفال',
      paragraphs: [
        `خدمات دي-راب موجهة حصراً لقطاع الأعمال والمنشآت التجارية والأشخاص المؤهلين نظاماً ممن أتموا سن الرشد القانوني (${LEGAL_CONFIG.operational.minimumAge} عاماً). ولا نجمع عن عمد أي بيانات تخص القُصّر أو الأطفال. وإذا نمى إلى علمك قيام قاصر بتزويدنا ببياناته دون موافقة وليه الشرعي، يرجى إخطارنا فوراً لحذف السجلات ذات الصلة.`,
      ],
    },
    {
      id: 'cookies-and-tracking',
      title: '10. ملفات تعريف الارتباط وتقنيات التتبع',
      paragraphs: [
        'يستخدم موقعنا ملفات تعريف ارتباط ضرورية وسجلات تخزين محلي لازمة لتشغيل الواجهة البرمجية، وتحديد رمز الدولة، وحفظ الوضع اللوني المفضل، وتأمين جلسة العمل. ولا نقوم حالياً بتشغيل ملفات تتبع إعلانية لأطراف ثالثة أو أدوات إعادة استهداف ترويجية.',
        'للاطلاع على تفاصيل كل ملف وقيمته الفنية ومدة صلاحيته، يُرجى مراجعة صفحة "سياسة ملفات تعريف الارتباط".',
      ],
    },
    {
      id: 'changes-to-policy',
      title: '11. التعديلات على سياسة الخصوصية',
      paragraphs: [
        'يحق لنا تحديث سياسة الخصوصية هذه بصورة دورية لمواكبة التحديثات التقنية في المنصة أو المتطلبات النظامية المستجدة. وسيتم نشر أي تعديل على هذه الصفحة مع تحديث تاريخ "آخر تحديث" في مقدمة الوثيقة. ويُعد استمرارك في استخدام المنصة بعد تاريخ النشر موافقة ضمنية على الشروط المحدثة.',
      ],
    },
    {
      id: 'contact-us',
      title: '12. معلومات التواصل والممثل النظامي',
      paragraphs: [
        'إذا كانت لديك أي استفسارات أو ملاحظات أو شكاوى تتعلق بسياسة الخصوصية هذه، يُرجى التواصل معنا عبر القنوات المعتمدة التالية:',
        {
          list: [
            `الكيان المشغل: ${LEGAL_CONFIG.company.legalName} (${LEGAL_CONFIG.company.parentGroup})`,
            `العنوان الوطني: ${LEGAL_CONFIG.company.headquartersAddress.street}، ${LEGAL_CONFIG.company.headquartersAddress.district}، ${LEGAL_CONFIG.company.headquartersAddress.city}، ${LEGAL_CONFIG.company.headquartersAddress.country}`,
            `رقم السجل التجاري: ${LEGAL_CONFIG.company.commercialRegistrationNumber}`,
            `بريد الخصوصية والشؤون القانونية: ${LEGAL_CONFIG.contact.privacyEmail} / ${LEGAL_CONFIG.contact.legalEmail}`,
            `البريد العام: ${LEGAL_CONFIG.contact.generalEmail}`,
            `الهاتف: ${LEGAL_CONFIG.contact.phone}`,
          ],
        },
      ],
    },
  ],
  relatedDocsTitle: 'وثائق قانونية ذات صلة',
  relatedDocs: [
    {
      title: 'الشروط والأحكام',
      description: 'اطّلع على البنود التعاقدية المنظمة لاستخدام سوق دي-راب، والتزامات المعلنين، ومسؤوليات موردي الشاشات.',
      href: '/terms-and-conditions',
    },
    {
      title: 'سياسة ملفات تعريف الارتباط',
      description: 'تعرّف على ملفات الارتباط الأولية، والتخزين المحلي، وآلية تحديد الدولة المستخدمة في المنصة.',
      href: '/cookie-policy',
    },
  ],
};

export function getPrivacyPolicy(lang: Locale): LegalDocument {
  return lang === 'ar' ? privacyPolicyAr : privacyPolicyEn;
}
