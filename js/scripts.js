/*!
    Title: Dev Portfolio Template
    Version: 1.2.1
    Last Change: 08/27/2017
    Author: Ryan Fitzgerald
    Repo: https://github.com/RyanFitzgerald/devportfolio-template
    Issues: https://github.com/RyanFitzgerald/devportfolio-template/issues

    Description: This file contains all the scripts associated with the single-page
    portfolio website.
*/

function recalcularFechas() {
    $('.vtimeline-date').remove();
    $('#experience-timeline').each(function() {
        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function() {
            var date = $(this).data('date');
            if (date) { // Prepend if exists
                $(this).parent().prepend('<span class="vtimeline-date">'+date+'</span>');
            }
        });
    });
}

function googleAnalyticsEvent(categoria, evento) {
    if ("ga" in window) {
        tracker = ga.getAll()[0];
        if (tracker)
            tracker.send("event", categoria, evento);
    }
}

(function($) {

    // Remove no-js class
    $('html').removeClass('no-js');

    // Animate to section when nav is clicked
    $('header a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        googleAnalyticsEvent('session', heading);
        var scrollDistance = $(heading).offset().top;

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, Math.abs(window.pageYOffset - $(heading).offset().top) / 1);

        // Hide the menu once clicked if mobile
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active');
        }
    });

    // Scroll to top
    $('#to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 300);
    });

    // Scroll to first element
    $('#lead-down span').click(function() {
        var scrollDistance = $('#lead').next().offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 300);
    });

    // Create timeline
    $('#experience-timeline').each(function() {

        $this = $(this); // Store reference to this
        $userContent = $this.children('div'); // user content

        // Create each timeline block
        $userContent.each(function() {
            $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
        });

        // Add icons to each block
        $this.find('.vtimeline-point').each(function() {
            $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker-alt"></i></div>');
        });

        recalcularFechas();
    });

    // Open mobile menu
    $('#mobile-menu-open').click(function() {
        $('header, body').addClass('active');
    });

    // Close mobile menu
    $('#mobile-menu-close').click(function() {
        $('header, body').removeClass('active');
    });

    // Load additional projects
    $('#view-more-projects').click(function(e){
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300);
        });
    });

    $('.idioma').click(function() {
        $('.idioma-seleccionado').removeClass('idioma-seleccionado');
        $(this).addClass('idioma-seleccionado');
        var idioma = $(this).data('lang');
        i18next.changeLanguage(idioma);
        $('body').localize();
        recalcularFechas();
        googleAnalyticsEvent('idioma', idioma);
    });

})(jQuery);

i18next.init({
    lng: 'en', // evtl. use language-detector https://github.com/i18next/i18next-browser-languageDetector
    resources: { // evtl. load via xhr https://github.com/i18next/i18next-xhr-backend
        es: {
            translation: {
                header: {
                    sobre_mi: 'Sobre mí',
                    experiencia: 'Experiencia',
                    formacion: 'Formación',
                    proyectos: 'Proyectos',
                    competencias: 'Competencias',
                    contacto: 'Contacto',
                },
                lead: {
                    desarrollador_de_software: 'Desarrollador de Software',
                    descargar_curriculum: 'Descargar Currículum'
                },
                about: {
                    sobre_mi: 'Sobre mí',
                    sobre_mi_texto: 'Con 7 años de experiencia en empresas de Argentina y Brasil, he trabajado empresas de distintos sectores y con varias tecnologías, las cuales tengo gran experiencia con PHP, MySQL, JavaScript, jQuery, Frameworks MVC(Laravel, Zend Framework, CodeIgniter), Bootstrap, integración de sistemas de pago(PayPal, Stripe), integración de sistemas Moodle y WordPress. Me encanta lo que hago y lo que todavía puedo hacer!'
                },
                experience: {
                    experiencia: 'Experiencia',
                    programador_web: 'Programador Web',
                    donweb_fechas: 'Marzo 2017 – Junio 2019',
                    donweb_texto: 'En Donweb, trabajo en el equipo responsable por procesar pagos, crear y activar cuentas y servicios de clientes, generación de reportes y sistema interno. Los principales proyectos en los cuales estuve participando fueron para una nueva página de pagos donde desarrollé backend para recibir pagos con Tarjeta de crédito, Stripe, PayPal, Visa Perú y WebPay Chile. Estuve participando también en el desarrollo de soporte para certificados SSL de Let\'s Encrypt en las cuentas de hosting y un servidor de consulta de WhoIs en NodeJS.',
                    iga_texto: 'En IGA, hice desarrollo de aplicaciones web en entorno LAMP con Framework CodeIgniter, hice muchos trabajos usando las APIs de Google Analytics, Facebook, EnvialoSimple y Moodle. Trabajé controlando en ciclo de desarrollo de las aplicaciones de IGA y apoyando a equipos remotos.',
                    doctum_texto: 'Flux Softwares proporciona servicios a la misma facultad donde estudié. En Flux trabajé con desarrollo de sistemas web en entorno LAMP con PHP puro, después con Zend Framework 2, desarrollé algunas aplicaciones móviles multiplataforma con PhoneGap. Trabajé también con desarrollo e integración de un sistema de gerenciamiento de contenido académico en WordPress.',
                    iga_fechas: 'Julio 2016 – Marzo 2017',
                    doctum_fechas: 'Mayo 2013 – Mayo 2016',
                    avature_fechas: 'Junio 2019 – Hoy',
                    avature_texto: 'En Avature, trabajo como programador fullstack en el equipo de Fields. Trabajando con PHP, base de datos SQL y Javascript. Trabajamos diariamente con metodologias ágiles y un equipo distribuído por Argentina y España.',
                },
                education: {
                    formacion: 'Formación',
                    ciencia_computacion_fechas: 'Enero 2012 - Diciembre 2015',
                    ciencia_computacion: 'Licenciatura en Ciencias de la Computación',
                },
                projects: {
                    proyectos: 'Proyectos',
                    sistema_ventas: 'Sistema de Ventas',
                    texto_sistema_ventas: 'Sistema de Ventas hecho para cliente de Rosario a medida con manejo de clientes, estoque, ventas y generación de reportes.',
                    texto_hilosh: 'Una aplicación creada con el equipo HilOsH en el NASA Space Apps de 2017, es una aplicación para prognostico de inundaciones con alertas por email. La aplicación fue desarrollada con Laravel, API Dark Sky y base de datos MySQL.',
                    texto_o_que_vc_prefere: 'Una aplicación para Android que alcanzó 150.000 descargas! Una aplicación desarrollada con PhoneGap, ademas todo el contenido era gestionado através de un servidor PHP con MySQL.',
                    view_more_projects: "Ver mas projectos"
                },
                skills: {
                    competencias: 'Competencias',
                },
                contact: {
                    contacto: 'Contacto',
                    enviar: 'Enviar',
                    email: 'Email',
                    su_mensaje: 'Su mensaje!'
                }
            }
        },
        pt: {
            translation: {
                header: {
                    sobre_mi: 'Sobre mim',
                    experiencia: 'Experiência',
                    formacion: 'Educação',
                    proyectos: 'Projetos',
                    competencias: 'Conhecimentos',
                    contacto: 'Contato',
                },
                lead: {
                    desarrollador_de_software: 'Desenvolvedor de Software',
                    descargar_curriculum: 'Baixar Currículum'
                },
                about: {
                    sobre_mi: 'Sobre mim',
                    sobre_mi_texto: 'Com 7 anos de experiência em empresas da Argentina e Brasil, trabalhei em empresas de deferentes áreas e com várias tecnologias, das quais tenho grande experiência com PHP, MySQL, JavaScript, jQuery, Frameworks MVC(Laravel, Zend Framework, CodeIgniter), Bootstrap, integração de sistemas de pagamento online(PayPal, Stripe), integração de sistema Moodle e Wordpress. Amo o que faço e o que ainda posso fazer!'
                },
                experience: {
                    experiencia: 'Experiência',
                    programador_web: 'Programador Web',
                    donweb_fechas: 'Março 2017 – Junho 2019',
                    donweb_texto: 'Em Donweb, trabalho no projeto responsável por processar pagamentos, criar e ativa contas e serviços para os clientes, geração de relatórios e sistema interno. Os principais projetos que eu participei foram a criação de uma nova página de pagamentos na qual desenvolvi o backend para receber pagamentos con cartão de crédito, Stripe, PayPal, Visa Perú e WebPay Chile. Também participei no soporte para certificados SSL de Let\'s Encrypt nas contas de hosting e um servidor de consulta de WhoIs em NodeJS.',
                    iga_texto: 'Em IGA, participei de um projeto web em ambiente LAMP com Framework CodeIgniter, além disso, fiz muito projetos usando as APIs do Google Analytics, Facebook, EnvialoSimple e Moodle, controlei o fluxo de desenvolvimento das aplicações em IGA e apoiei a equipes de trabalho remoto.',
                    doctum_texto: 'Flux Softwares oferece serviços a mesma faculdade onde eu estudei. Na Flux trabalhei em vários sistemas com ambiente LAMP e Zend Framework 2, desenvolvi alguma aplicações multiplataforma com PhoneGap. Trabalhei também na desolvolvimento e integração de um sistema de gerenciamiento de conteúdo acadêmico em WordPress.',
                    iga_fechas: 'Julho 2016 – Março 2017',
                    doctum_fechas: 'Maio 2013 – Maio 2016',
                    avature_fechas: 'Junho 2019 – Hoje  ',
                    avature_texto: 'Em Avature, trabalho como programador fullstack na equipe Fields. Trabalhamos com PHP, banco de dados SQL e Javascript. Trabalhamos diariamente com metodologias ágeis e uma equipe distribuída por Argentina e Espanha.',
                },
                education: {
                    formacion: 'Formação',
                    ciencia_computacion_fechas: 'Janeiro 2012 - Dezembro 2015',
                    ciencia_computacion: 'Bacharelado em Ciência da Computação',
                },
                projects: {
                    proyectos: 'Projetos',
                    sistema_ventas: 'Sistema de Vendas',
                    texto_sistema_ventas: 'Sistema de Vendas criado para cliente de Rosario a medida com gestão de clientes, estoque, vendas e generação de relatórios.',
                    texto_hilosh: 'Um sistema criado com a equipe HilOsH no NASA Space Apps de 2017, é um sistema para previsão de inundações com alertas por email. Desenvolvimos a aplicação usando Laravel, API de Dark Sky e banco de datos MySQL.',
                    texto_o_que_vc_prefere: 'Um app para Android que teve mais de 150.000 downloads! A aplicação foi programada con PhoneGap, além disso todo o conteúdo era gerenciado desde um servidor PHP e MySQL.',
                    view_more_projects: "Ver mais projetos"
                },
                skills: {
                    competencias: 'Conhecimentos',
                },
                contact: {
                    contacto: 'Contato',
                    enviar: 'Enviar',
                    email: 'Email',
                    su_mensaje: 'Sua mensagem!'
                }
            }
        },
        en: {
            translation: {
                header: {
                    sobre_mi: 'About',
                    experiencia: 'Experience',
                    formacion: 'Education',
                    proyectos: 'Projects',
                    competencias: 'Skills',
                    contacto: 'Contact',
                },
                lead: {
                    desarrollador_de_software: 'Software Developer',
                    descargar_curriculum: 'Download Curriculum'
                },
                about: {
                    sobre_mi: 'About',
                    sobre_mi_texto: 'I have 7 years of experience in companies in Argentina and Brazil, I have worked in companies of different fields and with several technologies, in which I have a lot of experience with PHP, MySQL, JavaScript, jQuery, MVC Frameworks (Laravel, Zend Framework, CodeIgniter), Bootstrap, integration of online payment systems (PayPal, Stripe), integration of Moodle and Wordpress systems. I love what I do and what I can still do!'
                },
                experience: {
                    experiencia: 'Experience',
                    programador_web: 'Web Developer',
                    donweb_fechas: 'March 2017 – June 2019',
                    donweb_texto: 'In Donweb, I work on the project responsible for processing payments, creating and activating accounts and services for clients, reporting and internal system. The main projects I participated in were the creation of a new payment page in which I developed the backend to receive payments with credit card, Stripe, PayPal, Visa Peru and WebPay Chile. I also participated in the support for Let\'s Encrypt SSL certificates in the hosting accounts and a WhoIs server in NodeJS.',
                    iga_texto: 'In IGA, I participated in a web project in LAMP environment with CodeIgniter Framework, in addition, I did a lot of projects using the Google Analytics, Facebook, EnvialoSimple and Moodle APIs, controlled the development flow of IGA applications and supported remote work teams',
                    doctum_texto: 'Flux Softwares offers services to the same college where I studied. In Flux I worked on several systems with LAMP environment and Zend Framework 2, I developed some multiplatform applications with PhoneGap. I also worked on the development and integration of an academic content management system in WordPress.',
                    iga_fechas: 'July 2016 – March 2017',
                    doctum_fechas: 'May 2013 – May 2016',
                    avature_fechas: 'June 2019 – Today',
                    avature_texto: 'In Avature, I work as a fullstack developer in the Fields team. We use PHP, SQL database y Javascript. We use agile methodologies daily and your team are distributed in Argentina and Spain.',
                },
                education: {
                    formacion: 'Education',
                    ciencia_computacion_fechas: 'January 2012 - December 2015',
                    ciencia_computacion: 'Bachelor in Computer Science',
                },
                projects: {
                    proyectos: 'Projects',
                    sistema_ventas: 'Sales System',
                    texto_sistema_ventas: 'Sales System created for Rosario customer, with customer management, inventory, sales and reporting.',
                    texto_hilosh: 'A system created with the HilOsH team in NASA Space Apps of 2017, is a flood forecasting system with email alerts. We developed the application using Laravel, Dark Sky API and MySQL database.',
                    texto_o_que_vc_prefere: 'An Android app that had over 150,000 downloads! The application was programmed with PhoneGap, in addition all the content was managed from a PHP and MySQL server.',
                    view_more_projects: "View more projects"
                },
                skills: {
                    competencias: 'Skills',
                },
                contact: {
                    contacto: 'Contact',
                    enviar: 'Send',
                    email: 'Email',
                    su_mensaje: 'Your message!'
                }
            }
        }
    }
}, function(err, t) {
    jqueryI18next.init(i18next, $);
    $('body').localize();
    recalcularFechas();
});
