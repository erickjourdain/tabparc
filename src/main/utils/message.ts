import MailComposer from 'nodemailer/lib/mail-composer'
import { Opportunite } from '../type'
import fs from 'fs'
import { dayFromDate, monthFromDate, yearFromdate } from './extractData'
import { loggedUser } from '../database/controller/login'

/**
 * Création du message pour envoi de la liste des instruments
 * @param opp Opportunite
 * @param filePath string répertoire de l'opportunité
 * @returns MailComposer message à envoyer
 */
const mailListeInstrument = (opp: Opportunite, filePath: string) => {
  const year = yearFromdate(opp.dateCreation)
  const month = monthFromDate(opp.dateCreation)
  const day = dayFromDate(opp.dateCreation)

  return new MailComposer({
    from: `${loggedUser.nom} ${loggedUser.prenom}<${loggedUser.email}>`,
    sender: `${loggedUser.nom} ${loggedUser.prenom}<${loggedUser.email}>`,
    to: `${opp.contactEmail}`,
    replyTo: `${loggedUser.nom} ${loggedUser.prenom}<${loggedUser.email}>`,
    subject: `List instruments ${year} à étalonner`,
    text: 'Hello World!',
    html: `${head()}
    <body lang=FR link="#467886" vlink="#96607D" style='tab-interval:35.4pt;word-wrap:break-word'>
      Bonjour,<br>
      je vous prie de bien vouloir trouver ci-joint un fichier Excel que vous voudrez bien nous retourner
      avec la liste de vos instruments à étalonner.
      Je vous remercie par avance et me tiens à votre disposition si vous souhaitez des informations complémentaires.
      <br><br>
      Bien cordialement
      <br><br>
      ${signature()}
    </body>`,
    attachments: [
      {
        filename: `${opp.reference}_demande.xlsx`,
        content: fs.readFileSync(`${filePath}/${year}${month}${day}_${opp.reference}_demande.xlsx`),
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    ]
  })
}

const signature = () => {
  return `
    <p class=MsoNormal style='margin:1.2pt'><a name="_MailAutoSig"><b><span
    style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
    "Times New Roman";mso-fareast-theme-font:minor-fareast;color:#003A70;
    mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:FR;mso-no-proof:
    yes'>${loggedUser.nom} ${loggedUser.prenom}</span></b></a><span style='mso-bookmark:_MailAutoSig'><span
    style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
    "Times New Roman";mso-fareast-theme-font:minor-fareast;color:#003A70;
    mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:FR;mso-no-proof:
    yes'><o:p></o:p></span></span></p>

    <p class=MsoNormal style='margin:1.2pt'><span style='mso-bookmark:_MailAutoSig'><span
    style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
    "Times New Roman";mso-fareast-theme-font:minor-fareast;color:#003A70;
    mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:FR;mso-no-proof:
    yes'>${loggedUser.titre}<o:p></o:p></span></span></p>

    <p class=MsoNormal style='margin:1.2pt'><span style='mso-bookmark:_MailAutoSig'><span
    style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
    "Times New Roman";mso-fareast-theme-font:minor-fareast;color:#003A70;
    mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:FR;mso-no-proof:
    yes'>Direction Commerciale et Marketing<o:p></o:p></span></span></p>

    <p class=MsoNormal style='margin:1.2pt'><span style='mso-bookmark:_MailAutoSig'><span
    style='font-size:10.0pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
    "Times New Roman";mso-fareast-theme-font:minor-fareast;color:#003A70;
    mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:FR;mso-no-proof:
    yes'>Tél.: ${loggedUser.telephone}<o:p></o:p></span></span></p>

    <table class=MsoNormalTable border=0 cellspacing=3 cellpadding=0 width=370
      style='width:277.5pt;mso-cellspacing:1.5pt;mso-yfti-tbllook:1184;mso-padding-alt:
      0cm 5.4pt 0cm 5.4pt'>
      <tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes;
        height:22.5pt'>
        <td width=350 valign=bottom style='width:262.5pt;padding:.75pt .75pt .75pt .75pt;
        height:22.5pt'>
        <p class=MsoNormal><span style='mso-bookmark:_MailAutoSig'><span
        style='font-size:8.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
        "Times New Roman";color:#003A70;mso-font-kerning:0pt;mso-ligatures:none;
        mso-fareast-language:FR;mso-no-proof:yes'>Laboratoire national de métrologie
        et d'essais<br>
        1 rue Gaston Boissier 75724 Paris Cedex 15 - </span></span><a
        href="https://www.lne.fr/" title="Lien vers le site lne.fr"><span
        style='mso-bookmark:_MailAutoSig'><span style='font-size:8.5pt;font-family:
        "Arial",sans-serif;mso-fareast-font-family:"Times New Roman";color:#003A70;
        mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:FR;mso-no-proof:
        yes;text-decoration:none;text-underline:none'>lne.fr</span></span></a><span
        style='mso-bookmark:_MailAutoSig'><span style='font-size:8.5pt;font-family:
        "Arial",sans-serif;mso-fareast-font-family:"Times New Roman";color:#003A70;
        mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:FR;mso-no-proof:
        yes'> <o:p></o:p></span></span></p>
        </td>
        <span style='mso-bookmark:_MailAutoSig'></span>
        <td width=20 valign=bottom style='width:15.0pt;padding:.75pt .75pt .75pt .75pt;
        height:22.5pt'>
        <p class=MsoNormal><span style='mso-bookmark:_MailAutoSig'></span><a
        href="https://www.linkedin.com/company/lne"><span style='mso-bookmark:_MailAutoSig'><span
        style='font-size:8.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
        "Times New Roman";color:blue;mso-font-kerning:0pt;mso-fareast-language:FR;
        mso-no-proof:yes;text-decoration:none;text-underline:none'><img border=0
        width=24 height=24 id="_x0000_i1028"
        src="https://www.lne.fr/sites/default/files/signature-mail/new-linkedin.png"
        alt="Logo LinkedIn"></span></span><span style='mso-bookmark:_MailAutoSig'></span></a><span
        style='mso-bookmark:_MailAutoSig'><span style='font-size:8.5pt;font-family:
        "Arial",sans-serif;mso-fareast-font-family:"Times New Roman";color:#003A70;
        mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:FR;mso-no-proof:
        yes'><o:p></o:p></span></span></p>
        </td>
        <span style='mso-bookmark:_MailAutoSig'></span>
        <td width=20 valign=bottom style='width:15.0pt;padding:.75pt .75pt .75pt .75pt;
        height:22.5pt'>
        <p class=MsoNormal><span style='mso-bookmark:_MailAutoSig'></span><a
        href="https://twitter.com/LNE_fr"><span style='mso-bookmark:_MailAutoSig'><span
        style='font-size:8.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
        "Times New Roman";color:blue;mso-font-kerning:0pt;mso-fareast-language:FR;
        mso-no-proof:yes;text-decoration:none;text-underline:none'><img border=0
        width=24 height=24 id="_x0000_i1027"
        src="https://www.lne.fr/sites/default/files/signature-mail/twitter.png"
        alt="Logo tweeter"></span></span><span style='mso-bookmark:_MailAutoSig'></span></a><span
        style='mso-bookmark:_MailAutoSig'><span style='font-size:8.5pt;font-family:
        "Arial",sans-serif;mso-fareast-font-family:"Times New Roman";color:#003A70;
        mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:FR;mso-no-proof:
        yes'><o:p></o:p></span></span></p>
        </td>
        <span style='mso-bookmark:_MailAutoSig'></span>
        <td width=20 valign=bottom style='width:15.0pt;padding:.75pt .75pt .75pt .75pt;
        height:22.5pt'>
        <p class=MsoNormal><span style='mso-bookmark:_MailAutoSig'></span><a
        href="https://www.youtube.com/channel/UCJ7oG6qxhK4EDBHSRW4f5nQ"
        target="_blank"><span style='mso-bookmark:_MailAutoSig'><span
        style='font-size:8.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
        "Times New Roman";color:blue;mso-font-kerning:0pt;mso-fareast-language:FR;
        mso-no-proof:yes;text-decoration:none;text-underline:none'><img border=0
        width=24 height=24 id="_x0000_i1026"
        src="https://www.lne.fr/sites/default/files/signature-mail/new-youtube.png"
        alt="Logo Youtube"></span></span><span style='mso-bookmark:_MailAutoSig'></span></a><span
        style='mso-bookmark:_MailAutoSig'><span style='font-size:8.5pt;font-family:
        "Arial",sans-serif;mso-fareast-font-family:"Times New Roman";color:#003A70;
        mso-font-kerning:0pt;mso-ligatures:none;mso-fareast-language:FR;mso-no-proof:
        yes'><o:p></o:p></span></span></p>
        </td>
        <span style='mso-bookmark:_MailAutoSig'></span>
      </tr>
    </table>

    <p class=MsoNormal><span style='mso-bookmark:_MailAutoSig'></span><a
    href="https://www.lne.fr/" target="_blank"
    title="Lien vers le site internet lne.fr"><span style='mso-bookmark:_MailAutoSig'><span
    style='font-size:8.5pt;font-family:"Arial",sans-serif;mso-fareast-font-family:
    "Times New Roman";color:blue;mso-font-kerning:0pt;mso-fareast-language:FR;
    mso-no-proof:yes;text-decoration:none;text-underline:none'><img border=0
    width=270 height=95 id="_x0000_i1025"
    src="https://www.lne.fr/sites/default/files/signature-mail/logo-signature-mail-lne.jpg"
    alt="Logo LNE"></span></span><span style='mso-bookmark:_MailAutoSig'></span></a><span
    style='mso-bookmark:_MailAutoSig'><span style='mso-fareast-font-family:"Times New Roman";
    mso-fareast-theme-font:minor-fareast;mso-font-kerning:0pt;mso-ligatures:none;
    mso-fareast-language:FR;mso-no-proof:yes'><o:p></o:p></span></span></p>
  `
}

const head = () => {
  return `
    <head>
    <meta http-equiv=Content-Type content="text/html; charset=windows-1252">
    <style>
    <!--
    /* Font Definitions */
    @font-face
      {font-family:"Cambria Math";
      panose-1:2 4 5 3 5 4 6 3 2 4;
      mso-font-charset:0;
      mso-generic-font-family:roman;
      mso-font-pitch:variable;
      mso-font-signature:-536869121 1107305727 33554432 0 415 0;}
    @font-face
      {font-family:Aptos;
      mso-font-charset:0;
      mso-generic-font-family:swiss;
      mso-font-pitch:variable;
      mso-font-signature:536871559 3 0 0 415 0;}
    /* Style Definitions */
    p.MsoNormal, li.MsoNormal, div.MsoNormal
      {mso-style-unhide:no;
      mso-style-qformat:yes;
      mso-style-parent:"";
      margin:0cm;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:"Aptos",sans-serif;
      mso-ascii-font-family:Aptos;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Aptos;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Aptos;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;
      mso-font-kerning:1.0pt;
      mso-ligatures:standardcontextual;
      mso-fareast-language:EN-US;}
    a:link, span.MsoHyperlink
      {mso-style-noshow:yes;
      mso-style-priority:99;
      color:#467886;
      mso-themecolor:hyperlink;
      text-decoration:underline;
      text-underline:single;}
    a:visited, span.MsoHyperlinkFollowed
      {mso-style-noshow:yes;
      mso-style-priority:99;
      color:#96607D;
      mso-themecolor:followedhyperlink;
      text-decoration:underline;
      text-underline:single;}
    span.EmailStyle17
      {mso-style-type:personal-compose;
      mso-style-noshow:yes;
      mso-style-unhide:no;
      mso-ansi-font-size:11.0pt;
      mso-bidi-font-size:11.0pt;
      font-family:"Aptos",sans-serif;
      mso-ascii-font-family:Aptos;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Aptos;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Aptos;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;
      color:windowtext;}
    .MsoChpDefault
      {mso-style-type:export-only;
      mso-default-props:yes;
      font-size:11.0pt;
      mso-ansi-font-size:11.0pt;
      mso-bidi-font-size:11.0pt;
      mso-ascii-font-family:Aptos;
      mso-ascii-theme-font:minor-latin;
      mso-fareast-font-family:Aptos;
      mso-fareast-theme-font:minor-latin;
      mso-hansi-font-family:Aptos;
      mso-hansi-theme-font:minor-latin;
      mso-bidi-font-family:"Times New Roman";
      mso-bidi-theme-font:minor-bidi;
      mso-fareast-language:EN-US;}
    @page WordSection1
      {size:612.0pt 792.0pt;
      margin:70.85pt 70.85pt 70.85pt 70.85pt;
      mso-header-margin:36.0pt;
      mso-footer-margin:36.0pt;
      mso-paper-source:0;}
    div.WordSection1
      {page:WordSection1;}
    -->
    </style>
    <!--[if gte mso 10]>
    <style>
    /* Style Definitions */
    table.MsoNormalTable
      {mso-style-name:"Tableau Normal";
      mso-tstyle-rowband-size:0;
      mso-tstyle-colband-size:0;
      mso-style-noshow:yes;
      mso-style-priority:99;
      mso-style-parent:"";
      mso-padding-alt:0cm 5.4pt 0cm 5.4pt;
      mso-para-margin:0cm;
      mso-pagination:widow-orphan;
      font-size:11.0pt;
      font-family:"Aptos",sans-serif;
      mso-ascii-font-family:Aptos;
      mso-ascii-theme-font:minor-latin;
      mso-hansi-font-family:Aptos;
      mso-hansi-theme-font:minor-latin;
      mso-font-kerning:1.0pt;
      mso-ligatures:standardcontextual;
      mso-fareast-language:EN-US;}
    </style>
    </head>
  `
}

export { mailListeInstrument }
