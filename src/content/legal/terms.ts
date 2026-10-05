import { LegalDocument, Locale } from './types';
import { LEGAL_CONFIG } from '@/config/legal';

export const termsAndConditionsEn: LegalDocument = {
  slug: 'terms-and-conditions',
  category: 'Legal',
  title: 'Terms & Conditions',
  intro:
    'These Terms & Conditions constitute a legally binding agreement between you and DiWrapp, operated by Distin-Gui Group. They govern your access to and use of the DiWrapp platform, website, advertising booking services, and supplier network.',
  effectiveDate: LEGAL_CONFIG.dates.effectiveDateEn,
  lastUpdated: LEGAL_CONFIG.dates.lastUpdatedEn,
  tableOfContentsTitle: 'In this article',
  sidebar: {
    title: 'Need to get in Touch?',
    description:
      'Have questions regarding our terms of service, advertiser guidelines, or screen listing agreements? Our team is available to assist you.',
    buttonText: 'Contact Us',
    buttonHref: '/contact',
  },
  sections: [
    {
      id: 'acceptance-and-eligibility',
      title: '1. Acceptance and Eligibility',
      paragraphs: [
        'By accessing, browsing, registering an account on, or submitting an application to DiWrapp (diwrapp.com), you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions, along with our Privacy Policy and Cookie Policy.',
        `To access or use DiWrapp, you must be at least ${LEGAL_CONFIG.operational.minimumAge} years of age and possess the full legal power, authority, and capacity to enter into binding commercial contracts. If you are entering into these Terms on behalf of a company, corporate brand, or media agency, you represent and warrant that you possess valid authority to legally bind that organization.`,
      ],
    },
    {
      id: 'marketplace-role',
      title: "2. The Service and DiWrapp's Role as a Marketplace",
      paragraphs: [
        'DiWrapp operates a digital marketplace and technological facilitation platform that connects advertisers seeking digital out-of-home (DOOH) screen inventory with independent suppliers, media owners, and screen hosts who control digital billboards, transit screens, venue displays, and urban outdoor networks.',
        'Unless expressly stated in a separate written agreement, DiWrapp acts as a technology intermediary and marketplace facilitator. DiWrapp does not own, lease, or physically maintain the third-party screens listed on the platform. The contractual delivery of the physical display time remains between the advertiser and the approved screen supplier, facilitated through the platform.',
        'During our current pre-launch and onboarding phase, public features may be limited to marketing overviews, partner onboarding forms, contact inquiries, and previews of coming-soon capabilities.',
      ],
    },
    {
      id: 'user-accounts',
      title: '3. User Accounts and Registration',
      paragraphs: [
        'To access advanced marketplace features, campaign booking tools, or vendor portals, you must create a user account. You agree to provide accurate, current, and complete information during registration and keep your account details updated.',
        'You are solely responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You must notify DiWrapp immediately at info@di-wrapp.com of any known or suspected security compromise.',
        'DiWrapp reserves the right, in its sole discretion, to reject any registration, refuse service, or disable accounts that provide deceptive, incomplete, or unauthorized information.',
      ],
    },
    {
      id: 'advertiser-obligations',
      title: '4. Advertiser Obligations and Content Standards',
      paragraphs: [
        'Advertisers are solely responsible for all creative materials, text, graphics, videos, trademarks, and messaging submitted for display on the DiWrapp marketplace.',
        {
          subheading: 'A. Prohibited Content Categories',
          paragraphs: [
            'Advertisers must strictly avoid submitting any advertising content that:',
          ],
          list: [
            'Violates applicable laws, public order, social decencies, or religious sensibilities in the country or municipality where the display screen is situated.',
            'Promotes unlawful substances, unauthorized pharmaceuticals, narcotics, or unregulated gaming/gambling.',
            'Contains hate speech, defamation, harassment, violence, sexually explicit material, or political messaging not explicitly licensed by competent authorities.',
            'Infringes third-party intellectual property, patent, trademark, copyright, or publicity rights.',
            'Contains deceptive, false, fraudulent, or unsubstantiated commercial claims or pyramid schemes.',
          ],
        },
        {
          subheading: 'B. Regulatory Approvals per Country',
          list: [
            'The advertiser bears full legal responsibility for securing all statutory media licenses, advertising permits, commercial registrations, and governmental approvals required by municipal and national authorities in the display country prior to campaign launch.',
            `In Saudi Arabia, advertisers must comply with all advertising standards established by the General Authority of Media Regulation (GAMR) and municipal authorities [TO CONFIRM: Specific regulatory approval upload requirements].`,
            'DiWrapp and screen suppliers reserve the absolute right to reject, suspend, or cancel any advertisement that fails compliance review without liability.',
          ],
        },
      ],
    },
    {
      id: 'supplier-obligations',
      title: '5. Supplier Obligations and Screen Listings',
      paragraphs: [
        'Entities applying to list digital screens ("Suppliers" or "Screen Hosts") must undergo an onboarding review and approval process by DiWrapp before any inventory goes live on the marketplace.',
        {
          list: [
            'Accurate Inventory Information: Suppliers must provide truthful, verifiable specifications regarding screen location, dimensions, resolution, operating hours, audio capabilities, and daily traffic estimates.',
            'Legal Authorization to Host: Suppliers warrant that they hold valid municipal permits, property lease agreements, commercial licenses, and rights to broadcast commercial advertisements on their screens.',
            `Display Uptime & SLA: Suppliers agree to maintain their hardware, media players, and network connectivity in sound working order to fulfill booked campaigns [TO CONFIRM: ${LEGAL_CONFIG.operational.screenUptimeSlaTarget}].`,
            'Proof of Play: Suppliers must furnish electronic logs, automated telemetry, or visual proof-of-performance confirming that scheduled advertiser campaigns aired in accordance with booking specifications.',
          ],
        },
      ],
    },
    {
      id: 'bookings-fees-cancellations',
      title: '6. Bookings, Fees, Payments, and Cancellations',
      paragraphs: [
        'The following commercial terms govern campaign reservations and platform transactions:',
        {
          list: [
            'Platform Fees and Pricing: Pricing for screen spots, loops, impressions, or day-parts is displayed on the marketplace or agreed in an official campaign order. Stated prices exclude statutory value-added tax (VAT) or local municipal fees unless explicitly noted.',
            'Payment Processing (Forward-Looking): Payments may be executed via approved corporate payment gateways, wire transfers, or dedicated platform wallet balances. Charges are billed in the agreed transaction currency.',
            `Cancellations and Refunds: Campaign reservations require advance coordination. [TO CONFIRM: Notice required: ${LEGAL_CONFIG.operational.campaignCancellationNoticeHours} hours prior to scheduled launch for partial or full credit; campaigns already broadcast or within 24 hours of live launch are non-refundable].`,
            'Disrupted Broadcasts: If an approved screen experiences technical failure, power outage, or municipal blackout, the supplier and DiWrapp will provide reasonable compensation through a rescheduled campaign make-good or pro-rata credit.',
          ],
        },
      ],
    },
    {
      id: 'intellectual-property',
      title: '7. Content and Intellectual Property',
      paragraphs: [
        'All intellectual property rights in the DiWrapp platform, including website architecture, software code, graphic user interfaces, brand names, logos, algorithms, and design tokens, remain the exclusive property of Distin-Gui Group and its licensors.',
        'By submitting advertising creative materials to DiWrapp, the advertiser grants DiWrapp and the designated screen supplier a non-exclusive, worldwide, royalty-free license to use, display, reproduce, and transmit the materials solely for the purpose of executing the booked campaign and providing proof-of-performance.',
      ],
    },
    {
      id: 'acceptable-use',
      title: '8. Acceptable Use Policy',
      paragraphs: [
        'You agree not to use the DiWrapp platform to:',
        {
          list: [
            'Scrape, crawl, harvest, or extract data from our marketplace using automated scripts, bots, or unauthorized spiders.',
            'Decompile, reverse-engineer, disassemble, or attempt to derive the source code of the platform or its APIs.',
            'Introduce viruses, trojans, worms, or malicious code that impairs system performance or breaches data security.',
            'Circumvent, bypass, or tamper with security measures, edge proxies, rate-limiters, or authentication mechanisms.',
            'Engage in fraudulent transactions, fictitious bookings, or unauthorized reselling of screen time.',
          ],
        },
      ],
    },
    {
      id: 'availability-and-changes',
      title: '9. Platform Availability and Modifications',
      paragraphs: [
        'DiWrapp strives to maintain high availability across its digital platforms. However, we do not warrant that our website, API, or marketplace tools will be uninterrupted, error-free, or continuously available. We reserve the right to perform scheduled maintenance, implement software updates, or suspend features without prior notice.',
      ],
    },
    {
      id: 'disclaimers',
      title: '10. Disclaimers of Warranties',
      paragraphs: [
        'TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, THE DIWRAPP PLATFORM, WEBSITE, AND MARKETPLACE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE.',
        'DISTIN-GUI GROUP DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE MAKE NO REPRESENTATIONS REGARDING THE SPECIFIC COMMERCIAL OUTCOME, IMPRESSIONS, CONVERSIONS, OR REVENUE GENERATED FROM ANY ADVERTISING CAMPAIGN.',
      ],
    },
    {
      id: 'limitation-of-liability',
      title: '11. Limitation of Liability',
      paragraphs: [
        'TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL DISTIN-GUI GROUP, ITS DIRECTORS, EMPLOYEES, AFFILIATES, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING LOSS OF PROFITS, DATA, GOODWILL, OR BUSINESS INTERRUPTION, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE PLATFORM.',
        `[TO CONFIRM: In all circumstances, DiWrapp’s total aggregate liability arising out of or related to these Terms or any campaign booking shall be limited to the total amount paid by the advertiser to DiWrapp for the specific disputed campaign in the three (3) months preceding the event, or one hundred US dollars ($100), whichever is greater].`,
      ],
    },
    {
      id: 'indemnification',
      title: '12. Indemnification',
      paragraphs: [
        'You agree to defend, indemnify, and hold harmless Distin-Gui Group, its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable legal fees) arising from: (a) your breach of these Terms; (b) any advertising material submitted by you that violates third-party intellectual property or local advertising regulations; or (c) your violation of applicable laws.',
      ],
    },
    {
      id: 'suspension-and-termination',
      title: '13. Suspension and Termination',
      paragraphs: [
        'DiWrapp may suspend or terminate your access to the platform immediately, without prior notice or liability, if you violate any provision of these Terms, engage in suspected fraudulent or unlawful activity, or fail to satisfy verification checks. Upon termination, your right to use the platform ceases immediately.',
      ],
    },
    {
      id: 'governing-law-disputes',
      title: '14. Governing Law and Dispute Resolution',
      paragraphs: [
        `These Terms & Conditions, and any dispute or claim arising out of or relating to them or their subject matter, shall be governed by and construed in accordance with ${LEGAL_CONFIG.jurisdiction.governingLawEn}.`,
        `Any controversy, dispute, or claim arising under these Terms that cannot be settled amicably shall be subject to the exclusive jurisdiction of ${LEGAL_CONFIG.jurisdiction.disputeForumEn}.`,
        `[TO CONFIRM: In the event of any conflict, discrepancy, or inconsistency between the English and Arabic versions of these Terms, the ${LEGAL_CONFIG.jurisdiction.prevailingLanguage === 'ar' ? 'Arabic' : 'English'} language text shall legally prevail].`,
      ],
    },
    {
      id: 'changes-to-terms',
      title: '15. Changes to These Terms',
      paragraphs: [
        'We reserve the right to revise or modify these Terms & Conditions at our discretion at any time. When modifications occur, we will update the "Last Updated" date at the top of this page. Your continued use of the DiWrapp platform following the publication of revised terms constitutes your binding acceptance of the changes.',
      ],
    },
    {
      id: 'contact-information',
      title: '16. Contact Information',
      paragraphs: [
        'If you have questions, notices, or inquiries concerning these Terms & Conditions, please contact us at:',
        {
          list: [
            `Company: ${LEGAL_CONFIG.company.legalName}`,
            `Parent Entity: ${LEGAL_CONFIG.company.parentGroup}`,
            `Address: ${LEGAL_CONFIG.company.headquartersAddress.street}, ${LEGAL_CONFIG.company.headquartersAddress.district}, ${LEGAL_CONFIG.company.headquartersAddress.city}, ${LEGAL_CONFIG.company.headquartersAddress.country}`,
            `Legal Inquiries: ${LEGAL_CONFIG.contact.legalEmail}`,
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
      title: 'Privacy Policy',
      description: 'Understand how DiWrapp gathers, uses, and protects personal data submitted through our marketplace and onboarding flows.',
      href: '/privacy-policy',
    },
    {
      title: 'Cookie Policy',
      description: 'Read about the essential session cookies, edge country detection tokens, and local preferences deployed on our platform.',
      href: '/cookie-policy',
    },
  ],
};

export const termsAndConditionsAr: LegalDocument = {
  slug: 'terms-and-conditions',
  category: 'وثيقة قانونية',
  title: 'الشروط والأحكام',
  intro:
    'تُشكل هذه الشروط والأحكام اتفاقاً قانونياً ملزماً بينك وبين منصة دي-راب (DiWrapp)، المشغلة من قبل مجموعة ديستين-جاي (Distin-Gui Group). وتُنظم هذه الشروط وصولك إلى المنصة واستخدامك لموقعها الإلكتروني وخدمات حجز الإعلانات وشبكة موردي الشاشات.',
  effectiveDate: LEGAL_CONFIG.dates.effectiveDateAr,
  lastUpdated: LEGAL_CONFIG.dates.lastUpdatedAr,
  tableOfContentsTitle: 'في هذه الوثيقة',
  sidebar: {
    title: 'هل تحتاج إلى مساعدة؟',
    description:
      'هل لديك استفسار حول شروط الخدمة، أو معايير المحتوى الإعلاني، أو اتفاقيات إدراج الشاشات؟ فريقنا القانوني والدعم في خدمتك دائماً.',
    buttonText: 'تواصل معنا',
    buttonHref: '/contact',
  },
  sections: [
    {
      id: 'acceptance-and-eligibility',
      title: '1. الموافقة والأهلية القانونية',
      paragraphs: [
        'يُعد استخدامك لمنصة دي-راب (diwrapp.com) أو تصفحها أو إنشاء حساب عليها أو تقديم طلب انضمام، إقراراً صريحاً بأنك قرأت وفهمت ووافقت على الالتزام التام بهذه الشروط والأحكام، إلى جانب سياسة الخصوصية وسياسة ملفات تعريف الارتباط.',
        `يشترط لاستخدام المنصة ألا يقل عمر المستخدم عن ${LEGAL_CONFIG.operational.minimumAge} عاماً، وأن يتمتع بالأهلية القانونية الكاملة لإبرام العقود والالتزامات التجارية. وإذا كنت تمثل منشأة تجارية أو وكالة إعلانية، فإنك تقر وتضمن بأن لديك الصلاحية والتفويض القانوني اللازم لإلزام تلك المنشأة.`,
      ],
    },
    {
      id: 'marketplace-role',
      title: '2. طبيعة الخدمة ودور دي-راب كوسيط وسوق رقمي',
      paragraphs: [
        'تعمل دي-راب كسوق رقمي ومنصة وسيطة توفر الربط التقني بين المُعلنين الراغبين في حجز مساحات على الشاشات الرقمية خارج المنزل (DOOH)، وبين المورّدين وملاك ومُشغلي الشاشات الرقمية المستقلين في الميادين، وشبكات النقل، والمراكز التجارية، والأماكن العامة.',
        'ما لم يُنص صراحة على خلاف ذلك في اتفاق خطي مستقل، فإن دور دي-راب ينحصر في الوساطة والربط التقني وأتمتة إجراءات الحجز. ولا تملك المنصة أو تدير الشاشات الفعلية المدرجة من قبل أطراف ثالثة، وتبقى مسؤولية بث المحتوى وسلامة الشاشة قائمة بين المعلن ومورد الشاشة المعني.',
        'خلال المرحلة الحالية، قد تقتصر ميزات الموقع المتاحة للعموم على التعريف بالخدمات، واستقبال طلبات التسجيل، ونماذج التواصل، واستعراض مزايا التحديثات القادمة.',
      ],
    },
    {
      id: 'user-accounts',
      title: '3. الحسابات والتسجيل',
      paragraphs: [
        'للوصول إلى ميزات الحجز المتقدمة وإدارة الحملات أو بوابات الشركاء، يتطلب النظام إنشاء حساب مستخدم. وتتعهد بتقديم معلومات صحيحة ودقيقة ومحدثة عند التسجيل وتحديثها كلما طرأ عليها أي تغيير.',
        'تتحمل المسؤولية الكاملة عن سرية بيانات تسجيل الدخول وكلمات المرور الخاصة بحسابك، وعن كافة الأنشطة والعمليات التي تُجرى من خلاله. ويتعين إخطارنا فوراً عبر info@di-wrapp.com عند الاشتباه في أي اختراق أو استخدام غير مصرح به.',
        'تحتفظ المنصة بالحق الكامل في رفض أي طلب تسجيل أو تعليق الحسابات التي تقدم بيانات غير دقيقة أو مضللة دون أي مسؤولية.',
      ],
    },
    {
      id: 'advertiser-obligations',
      title: '4. التزامات المُعلن وضوابط المحتوى الإعلاني',
      paragraphs: [
        'يتحمل المُعلن وحده المسؤولية القانونية الكاملة عن كافة المواد والتصاميم والنصوص ومقاطع الفيديو والعلامات التجارية المقدمة للبث عبر شاشات المنصة.',
        {
          subheading: 'أ. فئات المحتوى المحظور',
          paragraphs: [
            'يحظر تماماً على المعلن تقديم أو بث أي محتوى إعلاني يشتمل على:',
          ],
          list: [
            'ما يخالف النظام العام، أو الآداب العامة، أو القيم الدينية والاجتماعية في الدولة أو المدينة التي تقع بها الشاشة الإعلانية.',
            'الترويج للمواد المحظورة، أو العقاقير الطبية غير المرخصة، أو المؤثرات العقلية، أو أنشطة المراهنات والقمار غير المنظمة.',
            'خطاب الكراهية، أو التشهير، أو الإساءة، أو العنف، أو المحتوى الإباحي، أو الرسائل السياسية غير المرخصة من الجهات المختصة.',
            'التعدي على حقوق الملكية الفكرية، أو براءات الاختراع، أو العلامات التجارية، أو حقوق الطبع والنشر المملوكة للغير.',
            'البيانات الكاذبة أو المضللة أو الادعاءات الترويجية غير المثبتة أو الممارسات التسويقية الهرمية.',
          ],
        },
        {
          subheading: 'ب. التراخيص والموافقات النظامية لكل دولة',
          list: [
            'يلتزم المُعلن باستخراج كافة التراخيص الإعلانية والموافقات الرسمية المطلوبة من الهيئات الإعلامية والبلدية المختصة في الدولة محل البث قبل موعد إطلاق الحملة.',
            `في المملكة العربية السعودية، يلتزم المعلن بالمعايير والضوابط الصادرة عن الهيئة العامة لتنظيم الإعلام وأمانات المناطق [TO CONFIRM: متطلبات رفع التراخيص الإعلانية عبر المنصة].`,
            'يحق للمنصة وموردي الشاشات رفض أو إلغاء أو إيقاف أي إعلان لا يستوفي الاشتراطات النظامية دون أي التزام بالتعويض.',
          ],
        },
      ],
    },
    {
      id: 'supplier-obligations',
      title: '5. التزامات موردي وملاك الشاشات',
      paragraphs: [
        'تخضع المنشآت المتقدمة لإدراج شاشات إعلانية ("المورّدون" أو "الشركاء") لإجراءات تدقيق ومراجعة واعتماد من قبل دي-راب قبل تفعيل أي شاشة على المنصة.',
        {
          list: [
            'دقة مواصفات الشاشة: يلتزم المورد بتقديم بيانات حقيقية وموثقة بشأن موقع الشاشة، وأبعادها الهندسية، ودقتها، وساعات تشغيلها، وكثافة الحركة المرورية المحيطة بها.',
            'التراخيص النظامية للتشغيل: يقر المورد بامتلاكه لكافة التراخيص البلدية وعقود الإيجار والتصاريح التجارية التي تخوله نظاماً بث الإعلانات التجارية على شاشاته.',
            `الجاهزية ونسبة التشغيل (SLA): يلتزم المورد بضمان الصيانة الدورية للأجهزة ومشغلات الوسائط والاتصال الشبكي لضمان عرض الحملات في أوقاتها المحددة بنسبة تشغيل قياسية [TO CONFIRM: ${LEGAL_CONFIG.operational.screenUptimeSlaTarget}].`,
            'إثبات البث والعرض: يلتزم المورد بتوفير سجلات البث الآلية والتقارير الرقمية التي تثبت إتمام بث الحملات وفق ما تم الاتفاق عليه في أمر الحجز.',
          ],
        },
      ],
    },
    {
      id: 'bookings-fees-cancellations',
      title: '6. الحجوزات والرسوم وسياسة الإلغاء',
      paragraphs: [
        'تخضع عمليات الحجز والمعاملات المالية في المنصة للضوابط التالية:',
        {
          list: [
            'الأسعار والرسوم: تُحدد أسعار المساحات الإعلانية والمرات التكرارية وفترات العرض عبر المنصة أو في عروض الأسعار المعتمدة، ولا تشمل الأسعار ضريبة القيمة المضافة ما لم يُذكر خلاف ذلك صراحة.',
            'بوابات الدفع (أحكام تشغيلية مستقبلية): تتم المدفوعات عبر بوابات الدفع الإلكترونية المعتمدة أو التحويلات المصرفية أو عبر رصيد المحفظة الرقمية للمنصة وفق العملة المتفق عليها.',
            `الإلغاء واسترداد المبالغ: يتطلب إلغاء الحجز إشعاراً مسبقاً. [TO CONFIRM: يلزم تقديم طلب الإلغاء قبل موعد البث بمدة لا تقل عن ${LEGAL_CONFIG.operational.campaignCancellationNoticeHours} ساعة للحصول على استرداد أو رصيد؛ ولا يمكن استرداد المبالغ بعد بدء بث الحملة أو خلال الـ 24 ساعة السابقة له].`,
            'التعويض عن الأعطال: في حال حدوث عطل فني طارئ بالشاشة أو انقطاع في التيار الكهربائي، يلتزم المورد ودي-راب بتعويض المعلن عن طريق إعادة جدولة البث أو تقديم رصيد مالي متناسب مع ساعات الانقطاع.',
          ],
        },
      ],
    },
    {
      id: 'intellectual-property',
      title: '7. الملكية الفكرية وحقوق المحتوى',
      paragraphs: [
        'كافة حقوق الملكية الفكرية المرتبطة بمنصة دي-راب، بما يشمل الشفرة المصدرية، والواجهات البرمجية والتصميمية، والعلامات التجارية، والشعارات، والأنظمة الحسابية، تعود حصراً وملكية مطلقة لمجموعة ديستين-جاي ومرخصيها.',
        'يمنح المُعلن منصة دي-راب ومورد الشاشة المعني ترخيصاً غير حصري وعالمياً ومجانياً لعرض واستخدام وإعادة إنتاج المحتوى الإعلاني ونقله لغرض وحيد ومحدد هو تنفيذ الحملة المحجوزة وإصدار تقارير الأداء وإثبات البث.',
      ],
    },
    {
      id: 'acceptable-use',
      title: '8. سياسة الاستخدام المقبول',
      paragraphs: [
        'يتعهد المستخدم بعدم استخدام المنصة لأي من الأغراض التالية:',
        {
          list: [
            'استخراج البيانات أو كشط المحتوى آلياً باستخدام برمجيات الزحف أو البوتات غير المصرح بها.',
            'الهندسة العكسية، أو فك الشفرة، أو محاولة استخراج الكود المصدري للمنصة أو واجهاتها البرمجية.',
            'إدخال فيروسات، أو برمجيات خبيثة، أو ملفات ضارة قد تلحق الضرر بالأجهزة أو قواعد البيانات.',
            'التحايل على الإجراءات الأمنية، أو جدران الحماية، أو آليات التحقق من الهوية.',
            'تنفيذ حجوزات وهمية أو إعادة بيع المساحات الإعلانية لطرق ثالثة دون تفويض كتابي.',
          ],
        },
      ],
    },
    {
      id: 'availability-and-changes',
      title: '9. استمرارية المنصة والتعديلات التقنية',
      paragraphs: [
        'تسعى دي-راب لتوفير المنصة بأعلى مستويات الاعتمادية والأمان. ومع ذلك، فإننا لا نضمن خلو الموقع والخدمات من الانقطاعات أو الأخطاء الفنية الناتجة عن الصيانة الدورية أو التحديثات البرمجية أو المشكلات الخارجة عن الإرادة.',
      ],
    },
    {
      id: 'disclaimers',
      title: '10. إخلاء المسؤولية عن الضمانات',
      paragraphs: [
        'إلى الحد الأقصى المسموح به نظاماً، تُقدم منصة دي-راب وكافة خدمات الحجز "كما هي" و"بحسب توافرها"، دون أي إقرارات أو ضمانات من أي نوع، سواء كانت صريحة أو ضمنية.',
        'وتخلي مجموعة ديستين-جاي مسؤوليتها عن أي ضمانات ضمنية تتعلق بالملاءمة لغرض معين، أو القابلية للتسويق، أو ضمان تحقيق نسب وصول أو مبيعات أو عوائد تجارية محددة من الحملات الإعلانية.',
      ],
    },
    {
      id: 'limitation-of-liability',
      title: '11. تحديد المسؤولية القانونية',
      paragraphs: [
        'إلى أقصى حد تجيزه الأنظمة السارية، لا تتحمل مجموعة ديستين-جاي أو مسؤولوها أو موظفوها أي مسؤولية عن أي أضرار غير مباشرة، أو تبعية، أو خاصة، أو تأديبية، بما في ذلك خسارة الأرباح، أو توقف الأعمال، أو فقدان البيانات، الناشئة عن استخدام المنصة أو تعذر استخدامها.',
        `[TO CONFIRM: في جميع الأحوال، تنحصر المسؤولية الكلية للمنصة عن أي دعوى ناتجة عن هذه الشروط أو حجز إعلاني في حدود المبلغ الإجمالي الذي دفعه المعلن لدي-راب عن الحملة موضوع النزاع خلال الأشهر الثلاثة (3) السابقة للواقعة، أو ما يعادل 100 دولار أمريكي، أيهما أكبر].`,
      ],
    },
    {
      id: 'indemnification',
      title: '12. التعويض وإبراء الذمة',
      paragraphs: [
        'يلتزم المستخدم بتعويض مجموعة ديستين-جاي وشركائها وموظفيها وإبراء ذمتهم والدفاع عنهم ضد أي مطالبات أو دعاوى أو خسائر أو تكاليف (بما في ذلك أتعاب المحاماة المعقولة) تنشأ عن: (أ) مخالفته لهذه الشروط والأحكام؛ (ب) انتهاك المحتوى الإعلاني المقدم منه لأي حقوق ملكية فكرية أو تراخيص إعلامية؛ أو (ج) ارتكابه أي مخالفة للأنظمة المعمول بها.',
      ],
    },
    {
      id: 'suspension-and-termination',
      title: '13. تعليق الخدمات وإنهاء الحساب',
      paragraphs: [
        'يحق لدي-راب تعليق أو إنهاء وصولك إلى المنصة فوراً ودون إشعار مسبق في حال ارتكابك أي مخالفة جوهرية لهذه الشروط، أو الاشتباه في قيامك بأنشطة احتيالية أو غير مشروعة، أو عدم اجتياز تدقيق الأهلية.',
      ],
    },
    {
      id: 'governing-law-disputes',
      title: '14. القانون الواجب التطبيق وتسوية المنازعات',
      paragraphs: [
        `تخضع هذه الشروط والأحكام، وكافة الحقوق والالتزامات والمطالبات الناشئة عنها، وتُفسر حصراً وفقاً لما تقتضيه ${LEGAL_CONFIG.jurisdiction.governingLawAr}.`,
        `تختص ${LEGAL_CONFIG.jurisdiction.disputeForumAr} بالفصل الحصري في أي نزاع أو خلاف ينشأ عن تفسير أو تنفيذ هذه الشروط ويتعذر حله ودياً.`,
        `[TO CONFIRM: في حال وجود أي تعارض أو اختلاف في التفسير بين النصين العربي والإنجليزي لهذه الشروط، يُعتمد النص باللغة ${LEGAL_CONFIG.jurisdiction.prevailingLanguage === 'ar' ? 'العربية' : 'الإنجليزية'} كنص مرجعي ملزم].`,
      ],
    },
    {
      id: 'changes-to-terms',
      title: '15. التعديل على الشروط والأحكام',
      paragraphs: [
        'نحتفظ بالحق في تعديل أو تحديث هذه الشروط في أي وقت. وسيتم نشر الشروط المحدثة على هذه الصفحة مع تحديث تاريخ "آخر تحديث". ويُعد استمرارك في استخدام المنصة بعد نشر التعديلات قبولاً نظامياً ملزماً لتلك التعديلات.',
      ],
    },
    {
      id: 'contact-information',
      title: '16. معلومات التواصل والمراسلات الرسمية',
      paragraphs: [
        'لأي استفسارات قانونية أو مراسلات رسمية بشأن هذه الشروط والأحكام، يُرجى التواصل معنا عبر البيانات التالية:',
        {
          list: [
            `المنشأة: ${LEGAL_CONFIG.company.legalName}`,
            `المجموعة المالكة: ${LEGAL_CONFIG.company.parentGroup}`,
            `العنوان: ${LEGAL_CONFIG.company.headquartersAddress.street}، ${LEGAL_CONFIG.company.headquartersAddress.district}، ${LEGAL_CONFIG.company.headquartersAddress.city}، ${LEGAL_CONFIG.company.headquartersAddress.country}`,
            `بريد الشؤون القانونية: ${LEGAL_CONFIG.contact.legalEmail}`,
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
      title: 'سياسة الخصوصية',
      description: 'تعرّف على كيفية جمع بياناتك الشخصية واستخدامها وحمايتها في منصة دي-راب.',
      href: '/privacy-policy',
    },
    {
      title: 'سياسة ملفات تعريف الارتباط',
      description: 'اكتشف ملفات الارتباط والتخزين المحلي المعتمدة لإدارة الجلسات وحفظ التفضيلات.',
      href: '/cookie-policy',
    },
  ],
};

export function getTermsAndConditions(lang: Locale): LegalDocument {
  return lang === 'ar' ? termsAndConditionsAr : termsAndConditionsEn;
}
