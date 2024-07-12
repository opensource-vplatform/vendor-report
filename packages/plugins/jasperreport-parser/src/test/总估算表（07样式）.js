export default `<?xml version="1.0" encoding="UTF-8"  ?>
<!-- Created with iReport - A designer for JasperReports -->
<!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN" "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd">
<jasperReport
		 name="rpt08_01_1"
		 columnCount="1"
		 printOrder="Vertical"
		 orientation="Landscape"
		 pageWidth="842"
		 pageHeight="586"
		 columnWidth="758"
		 columnSpacing="0"
		 leftMargin="42"
		 rightMargin="42"
		 topMargin="70"
		 bottomMargin="42"
		 whenNoDataType="AllSectionsNoDetail"
		 isTitleNewPage="false"
		 isSummaryNewPage="false">
	<property name="ireport.scriptlethandling" value="0" />
	<property name="ireport.encoding" value="UTF-8" />
	<import value="java.util.*" />
	<import value="net.sf.jasperreports.engine.*" />
	<import value="net.sf.jasperreports.engine.data.*" />
	<reportFont name="st" isDefault="false" fontName="宋体" size="8" isBold="false" isItalic="false" isUnderline="false" isStrikeThrough="false" pdfFontName="Helvetica" pdfEncoding="Cp1250" isPdfEmbedded="false"/>
	<reportFont name="header" isDefault="false" fontName="宋体" size="18" isBold="true" isItalic="false" isUnderline="false" isStrikeThrough="false" pdfFontName="STSong-Light" pdfEncoding="UniGB-UCS2-H" isPdfEmbedded="true"/>
	<reportFont name="content" isDefault="false" fontName="宋体" size="9" isBold="false" isItalic="false" isUnderline="false" isStrikeThrough="false" pdfFontName="STSong-Light" pdfEncoding="UniGB-UCS2-H" isPdfEmbedded="true"/>

	<parameter name="editor" isForPrompting="false" class="java.lang.String"/>
	<parameter name="editScope" isForPrompting="false" class="java.lang.String"/>
	<parameter name="budgetName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="competency" isForPrompting="false" class="java.lang.String"/>
	<parameter name="projectName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="GY" isForPrompting="false" class="java.lang.String"/>
	<parameter name="alreadyAudit" isForPrompting="false" class="java.lang.String"/>
	<parameter name="auditor" isForPrompting="false" class="java.lang.String"/>
	<parameter name="deDate" isForPrompting="false" class="java.lang.String"/>
	<parameter name="ECRPT_REPORTTITLE" isForPrompting="false" class="java.lang.String"/>
	<parameter name="ECRPT_REPORTSHORTNAME" isForPrompting="false" class="java.lang.String"/>
	<parameter name="dJFileName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="fLFileName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="totalPrice" isForPrompting="false" class="java.lang.String"/>
	<parameter name="heTongDuan" isForPrompting="false" class="java.lang.String"/>
	<parameter name="gcszd" isForPrompting="false" class="java.lang.String"/>
	<parameter name="examinant" isForPrompting="false" class="java.lang.String"/>
	<parameter name="assessor" isForPrompting="false" class="java.lang.String"/>
	<parameter name="auditState" isForPrompting="false" class="java.lang.String"/>

	<field name="JCode" class="java.lang.String">
		<fieldDescription><![CDATA[JCode]]></fieldDescription>
	</field>
	<field name="MCode" class="java.lang.String">
		<fieldDescription><![CDATA[MCode]]></fieldDescription>
	</field>
	<field name="SCode" class="java.lang.String">
		<fieldDescription><![CDATA[SCode]]></fieldDescription>
	</field>
	<field name="XMCode" class="java.lang.String">
		<fieldDescription><![CDATA[XMCode]]></fieldDescription>
	</field>
	<field name="unit" class="java.lang.String">
		<fieldDescription><![CDATA[unit]]></fieldDescription>
	</field>
	<field name="gcl" class="java.lang.String">
		<fieldDescription><![CDATA[gcl]]></fieldDescription>
	</field>
	<field name="totalPrice" class="java.lang.Double">
		<fieldDescription><![CDATA[totalPrice]]></fieldDescription>
	</field>
	<field name="rate" class="java.lang.Double">
		<fieldDescription><![CDATA[rate]]></fieldDescription>
	</field>
	<field name="jsjjzb" class="java.lang.String">
		<fieldDescription><![CDATA[jsjjzb]]></fieldDescription>
	</field>
	<field name="name" class="java.lang.String">
		<fieldDescription><![CDATA[name]]></fieldDescription>
	</field>
	<field name="note" class="java.lang.String">
		<fieldDescription><![CDATA[note]]></fieldDescription>
	</field>
	<field name="no" class="java.lang.String"/>
	<field name="sgcl" class="java.lang.String"/>
	<field name="stotalPrice" class="java.lang.String"/>
	<field name="showQfw" class="java.lang.Boolean"/>
	<field name="sjsjjzb" class="java.lang.String"/>

		<background>
			<band height="0"  isSplitAllowed="true" >
			</band>
		</background>
		<title>
			<band height="0"  isSplitAllowed="true" >
			</band>
		</title>
		<pageHeader>
			<band height="58"  isSplitAllowed="true" >
				<textField isStretchWithOverflow="false" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						x="0"
						y="0"
						width="758"
						height="28"
						key="textField-39"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Top">
						<font fontName="宋体" pdfFontName="STSong-Light" size="18" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$P{ECRPT_REPORTTITLE}+$P{alreadyAudit}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="28"
						width="568"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-32"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["建设项目名称："+$P{projectName}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="43"
						width="283"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-33"
						positionType="Float"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["编制范围："+$P{editScope}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="658"
						y="43"
						width="52"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-35"
						stretchType="RelativeToBandHeight"
						positionType="Float"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["OP_PC"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="608"
						y="43"
						width="50"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-36"
						stretchType="RelativeToBandHeight"
						positionType="Float"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["第 " + String.valueOf($V{PAGE_NUMBER}.intValue()+new Integer(0).intValue()) + " 页"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						x="568"
						y="28"
						width="190"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-43"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Bottom" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$P{deDate}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="710"
						y="43"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-44"
						stretchType="RelativeToBandHeight"
						positionType="Float"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$P{ECRPT_REPORTSHORTNAME}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="468"
						y="43"
						width="140"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-45"
						stretchType="RelativeToBandHeight"
						positionType="Float"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$P{fLFileName}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="283"
						y="43"
						width="185"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-46"
						stretchType="RelativeToBandHeight"
						positionType="Float"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$P{dJFileName}]]></textFieldExpression>
				</textField>
			</band>
		</pageHeader>
		<columnHeader>
			<band height="26"  isSplitAllowed="false" >
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="147"
						y="0"
						width="156"
						height="26"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-8"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["工程或费用名称"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="348"
						y="0"
						width="90"
						height="26"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-10"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["数量"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="438"
						y="0"
						width="72"
						height="26"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-11"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["金额（元）"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="510"
						y="0"
						width="98"
						height="26"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-12"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["技术经济指标"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="608"
						y="0"
						width="50"
						height="26"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-13"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="Thin" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["各项费用比例(%)"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="303"
						y="0"
						width="45"
						height="26"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-23"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["单位"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="658"
						y="0"
						width="100"
						height="26"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-25"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["备注"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="33"
						height="26"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-55"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="1Point" topBorderColor="#000000" topPadding="1" leftBorder="1Point" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="Thin" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["项"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="33"
						y="0"
						width="33"
						height="26"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-56"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="1Point" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="Thin" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["目"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="66"
						y="0"
						width="33"
						height="26"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-57"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="1Point" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="Thin" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["节"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="99"
						y="0"
						width="48"
						height="26"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-58"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="1Point" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="Thin" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["细目"]]></textFieldExpression>
				</textField>
			</band>
		</columnHeader>
		<detail>
			<band height="15"  isSplitAllowed="false" >
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="147"
						y="0"
						width="156"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-17"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{name}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="348"
						y="0"
						width="90"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-18"
						stretchType="RelativeToTallestObject">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="Thin" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{gcl}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="438"
						y="0"
						width="72"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-20"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="Thin" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[$F{totalPrice}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="510"
						y="0"
						width="98"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-21"
						stretchType="RelativeToTallestObject">
							<printWhenExpression><![CDATA[!$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="Thin" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{jsjjzb}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="608"
						y="0"
						width="50"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-22"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="Thin" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[$F{rate}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="303"
						y="0"
						width="45"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-24"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{unit}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="658"
						y="0"
						width="100"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-26"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="Thin" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{note}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="33"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-59"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="None" topBorderColor="#000000" topPadding="1" leftBorder="1Point" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="Thin" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{SCode}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="33"
						y="0"
						width="33"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-60"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="None" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="Thin" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{MCode}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="66"
						y="0"
						width="33"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-61"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="None" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="Thin" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{JCode}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="99"
						y="0"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-62"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="None" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="Thin" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{XMCode}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="348"
						y="0"
						width="90"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-63"
						stretchType="RelativeToTallestObject">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="Thin" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{sgcl}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="510"
						y="0"
						width="98"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-64"
						stretchType="RelativeToTallestObject">
							<printWhenExpression><![CDATA[$F{showQfw}]]></printWhenExpression>
						</reportElement>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="Thin" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{sjsjjzb}]]></textFieldExpression>
				</textField>
			</band>
		</detail>
		<columnFooter>
			<band height="15"  isSplitAllowed="true" >
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="394"
						y="0"
						width="364"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-38">
							<printWhenExpression><![CDATA[!"青海".equalsIgnoreCase($P{gcszd}) || ("青海".equalsIgnoreCase($P{gcszd}) && !"编制".equalsIgnoreCase($P{auditState}))]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="3" rightBorder="None" rightBorderColor="#000000" rightPadding="5" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["复核："+$P{auditor}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="394"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-40"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!"青海".equalsIgnoreCase($P{gcszd}) || ("青海".equalsIgnoreCase($P{gcszd}) && !"编制".equalsIgnoreCase($P{auditState}))]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="3" rightBorder="None" rightBorderColor="#000000" rightPadding="5" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["编制："+$P{editor}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="189"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-51"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA["青海".equalsIgnoreCase($P{gcszd}) && "编制".equalsIgnoreCase($P{auditState})]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="3" rightBorder="None" rightBorderColor="#000000" rightPadding="5" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["编制："+$P{editor}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="189"
						y="0"
						width="189"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-52">
							<printWhenExpression><![CDATA["青海".equalsIgnoreCase($P{gcszd}) && "编制".equalsIgnoreCase($P{auditState})]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="3" rightBorder="None" rightBorderColor="#000000" rightPadding="5" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["复核："+$P{auditor}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="378"
						y="0"
						width="190"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-53">
							<printWhenExpression><![CDATA["青海".equalsIgnoreCase($P{gcszd}) && "编制".equalsIgnoreCase($P{auditState})]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="3" rightBorder="None" rightBorderColor="#000000" rightPadding="5" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["审查："+$P{examinant}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="568"
						y="0"
						width="190"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-54">
							<printWhenExpression><![CDATA["青海".equalsIgnoreCase($P{gcszd}) && "编制".equalsIgnoreCase($P{auditState})]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="3" rightBorder="None" rightBorderColor="#000000" rightPadding="5" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["审核："+$P{assessor}]]></textFieldExpression>
				</textField>
			</band>
		</columnFooter>
		<pageFooter>
			<band height="0"  isSplitAllowed="false" >
			</band>
		</pageFooter>
		<summary>
			<band height="0"  isSplitAllowed="true" >
			</band>
		</summary>
</jasperReport>
`