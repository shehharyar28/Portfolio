#!/usr/bin/env python3
"""Generate a professional CV PDF for Syed Baber Ali."""

from pathlib import Path

from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

OUT = Path(__file__).resolve().parents[1] / "public" / "assets" / "Syed_Baber_Ali_CV.pdf"

NAVY = HexColor("#0B1220")
CYAN = HexColor("#0E7490")
TEAL = HexColor("#0F766E")
SLATE = HexColor("#334155")
MUTED = HexColor("#64748B")
LINE = HexColor("#CBD5E1")
LIGHT = HexColor("#F1F5F9")


def build_styles():
    base = getSampleStyleSheet()
    styles = {
        "name": ParagraphStyle(
            "name",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=20,
            textColor=NAVY,
            alignment=TA_CENTER,
            spaceAfter=2,
            leading=24,
        ),
        "title": ParagraphStyle(
            "title",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10,
            textColor=CYAN,
            alignment=TA_CENTER,
            spaceAfter=2,
            leading=13,
        ),
        "tagline": ParagraphStyle(
            "tagline",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=6,
            leading=11,
        ),
        "contact": ParagraphStyle(
            "contact",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8,
            textColor=SLATE,
            alignment=TA_CENTER,
            spaceAfter=8,
            leading=11,
        ),
        "h": ParagraphStyle(
            "h",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10,
            textColor=NAVY,
            spaceBefore=8,
            spaceAfter=3,
            leading=12,
        ),
        "body": ParagraphStyle(
            "body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            textColor=SLATE,
            alignment=TA_JUSTIFY,
            leading=11.5,
            spaceAfter=4,
        ),
        "role": ParagraphStyle(
            "role",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9,
            textColor=NAVY,
            leading=11,
        ),
        "meta": ParagraphStyle(
            "meta",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8,
            textColor=MUTED,
            leading=10,
        ),
        "bullet": ParagraphStyle(
            "bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.2,
            textColor=SLATE,
            leftIndent=10,
            leading=11,
            spaceAfter=1,
        ),
        "proj": ParagraphStyle(
            "proj",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.2,
            textColor=SLATE,
            leading=11,
            spaceAfter=2.5,
        ),
        "skills": ParagraphStyle(
            "skills",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.2,
            textColor=SLATE,
            leading=11.5,
            spaceAfter=2,
        ),
    }
    return styles


def section(title: str, styles) -> list:
    return [
        Paragraph(title.upper(), styles["h"]),
        HRFlowable(width="100%", thickness=1, color=CYAN, spaceAfter=4, spaceBefore=0),
    ]


def bullet(text: str, styles) -> Paragraph:
    return Paragraph(f"• {text}", styles["bullet"])


def main():
    styles = build_styles()
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=A4,
        leftMargin=16 * mm,
        rightMargin=16 * mm,
        topMargin=12 * mm,
        bottomMargin=12 * mm,
        title="Syed Baber Ali — CV",
        author="Syed Baber Ali",
    )

    story = []

    # Header band via table
    header = Table(
        [[Paragraph("SYED BABER ALI", styles["name"])]],
        colWidths=[178 * mm],
    )
    header.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), LIGHT),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    story.append(header)
    story.append(Paragraph("Senior Mobile Application Developer  |  Team Lead", styles["title"]))
    story.append(
        Paragraph(
            "React Native  ·  Next.js  ·  Angular  ·  AI Systems  ·  6+ Years",
            styles["tagline"],
        )
    )
    story.append(
        Paragraph(
            "Karachi, Pakistan  ·  +92 329 2297354  ·  syedbaber115@gmail.com<br/>"
            "Portfolio: "
            '<link href="https://portfolio-eight-wine-57.vercel.app/">'
            "portfolio-eight-wine-57.vercel.app</link><br/>"
            "linkedin.com/in/syed-baber-ali-106831222  ·  github.com/Baber11",
            styles["contact"],
        )
    )

    # Summary
    story += section("Professional Summary", styles)
    story.append(
        Paragraph(
            "Results-driven Senior Mobile Application Developer and Team Lead with 6+ years of "
            "experience delivering production-grade cross-platform mobile applications using "
            "<b>React Native</b>, modern web platforms with <b>Next.js</b>, and enterprise "
            "<b>Angular</b> systems. Proven track record across healthcare, logistics, fintech, "
            "ride-hailing, e-commerce, facilities management, retail POS, and <b>AI surveillance</b>. "
            "Experienced in leading teams, owning architecture, integrating third-party services, "
            "and shipping App Store / Play Store products from concept to production.",
            styles["body"],
        )
    )

    # Skills
    story += section("Technical Skills", styles)
    story.append(
        Paragraph(
            "<b>Mobile &amp; Frontend:</b> React Native, TypeScript, JavaScript, React.js, "
            "Next.js, Angular, Redux Toolkit, Electron",
            styles["skills"],
        )
    )
    story.append(
        Paragraph(
            "<b>Backend &amp; Services:</b> REST APIs, Firebase (Auth, Firestore, Notifications), "
            "Payment Gateways, Google Maps, Agora, CometChat",
            styles["skills"],
        )
    )
    story.append(
        Paragraph(
            "<b>AI &amp; Domains:</b> AI / Computer Vision surveillance systems, "
            "enterprise retail POS, logistics platforms, healthcare workflows",
            styles["skills"],
        )
    )
    story.append(
        Paragraph(
            "<b>Tooling:</b> Git / GitHub, Android Studio, Xcode, Agile / Scrum, Vercel",
            styles["skills"],
        )
    )

    # Experience
    story += section("Professional Experience", styles)

    roles = [
        (
            "Team Lead — Mobile Applications",
            "VirtueXolutions  ·  Dec 2023 – Present",
            [
                "Lead React Native engineering teams across multiple client products; own architecture, planning, code reviews, and releases.",
                "Coordinate with stakeholders on delivery for logistics, retail POS, AI surveillance, and enterprise mobile systems.",
                "Mentor developers and establish coding standards, CI-ready workflows, and scalable project structure.",
            ],
        ),
        (
            "Senior React Native Developer",
            "VirtueXolutions  ·  Dec 2022 – Dec 2023",
            [
                "Designed end-to-end application architecture and shipped production-grade mobile products.",
                "Integrated payment gateways, real-time chat, live streaming, and mapping solutions.",
            ],
        ),
        (
            "React Native Developer",
            "TAFSOL  ·  Mar 2022 – Dec 2022",
            [
                "Built fintech, healthcare, multilingual, and e-commerce applications.",
                "Implemented Firebase authentication, push notifications, and third-party API integrations.",
            ],
        ),
        (
            "Associate Developer",
            "SAS Solution  ·  Nov 2020 – Feb 2022",
            [
                "Progressed from intern to professional developer contributing to hybrid mobile application development and maintenance.",
            ],
        ),
    ]

    for title, meta, bullets in roles:
        story.append(Paragraph(title, styles["role"]))
        story.append(Paragraph(meta, styles["meta"]))
        for b in bullets:
            story.append(bullet(b, styles))
        story.append(Spacer(1, 3))

    # Selected Projects
    story += section("Selected Projects", styles)

    projects = [
        (
            "<b>AI Surveillance System</b> — Intelligent video monitoring currently implemented at "
            "<b>California</b> and <b>Broadway</b> venues; computer-vision assisted enterprise surveillance workflows."
        ),
        (
            "<b>Order Intel POS</b> (Angular · Electron roadmap) — Multi-brand point-of-sale frontend for "
            "<b>Costa Coffee</b>, <b>Broadway</b>, and <b>California</b>; designed for Electron Windows EXE packaging. "
            "Demo: pos-frontend-rdsr.vercel.app/pos"
        ),
        (
            "<b>FleetEx Logistics</b> (Next.js) — International freight &amp; supply chain company website. "
            "fleetexlogistics.com"
        ),
        (
            "<b>Rapid Express Logistics</b> (Next.js) — Domestic &amp; international logistics platform with client portal. "
            "rapidexpresslogistic.com"
        ),
        (
            "<b>LookClean</b> — Barber booking &amp; e-commerce app live on "
            "<b>App Store</b> and <b>Google Play</b>."
        ),
        (
            "<b>Facilitate</b> — Facilities / work-order management app live on "
            "<b>App Store</b> and <b>Google Play</b>."
        ),
        (
            "<b>RideLynk</b> — Ride-hailing platform (User &amp; Rider apps) with real-time tracking and payments — Google Play."
        ),
        (
            "<b>Daweeye</b> — Multilingual healthcare and hospital management platform."
        ),
        (
            "<b>HatchSocial</b> — Social network with chat and live streaming (Agora / CometChat)."
        ),
        (
            "<b>Indoor Positioning App</b> — BLE-based indoor navigation for Dubai malls."
        ),
        (
            "<b>EndorseMe</b> — US-based freelance marketplace platform."
        ),
    ]
    for p in projects:
        story.append(Paragraph(f"• {p}", styles["proj"]))

    # Highlights
    story += section("Highlights", styles)
    for h in [
        "5+ years building and shipping commercial mobile and web products",
        "Apps published on both Apple App Store and Google Play Store",
        "AI surveillance deployed in production venues (California & Broadway)",
        "POS architecture prepared for Electron desktop distribution",
        "Team leadership with stakeholder communication and delivery ownership",
    ]:
        story.append(bullet(h, styles))

    # Education
    story += section("Education", styles)
    story.append(Paragraph("<b>BS Computer Science</b>", styles["role"]))
    story.append(
        Paragraph(
            "Bahria University, Karachi Campus  ·  CGPA: 3.2",
            styles["meta"],
        )
    )

    story.append(Spacer(1, 10))
    story.append(
        HRFlowable(width="100%", thickness=0.5, color=LINE, spaceAfter=4)
    )
    story.append(
        Paragraph(
            "References and additional project details available upon request.",
            ParagraphStyle(
                "footer",
                fontName="Helvetica-Oblique",
                fontSize=7.5,
                textColor=MUTED,
                alignment=TA_CENTER,
            ),
        )
    )

    doc.build(story)
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
