export default `<?xml version="1.0" encoding="UTF-8"  ?>
<!-- Created with iReport - A designer for JasperReports -->
<!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN" "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd">
<jasperReport
		 name="rpt14_08_02"
		 columnCount="1"
		 printOrder="Vertical"
		 orientation="Landscape"
		 pageWidth="842"
		 pageHeight="594"
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
	<reportFont name="st" isDefault="false" fontName="宋体" size="10" isBold="false" isItalic="false" isUnderline="false" isStrikeThrough="false" pdfFontName="Helvetica" pdfEncoding="Cp1250" isPdfEmbedded="false"/>

	<parameter name="projectName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="editScope" isForPrompting="false" class="java.lang.String"/>
	<parameter name="editor" isForPrompting="false" class="java.lang.String"/>
	<parameter name="projType" isForPrompting="false" class="java.lang.String"/>
	<parameter name="projType1" isForPrompting="false" class="java.lang.String"/>
	<parameter name="budgetName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="competency" isForPrompting="false" class="java.lang.String"/>
	<parameter name="GY" isForPrompting="false" class="java.lang.String"/>
	<parameter name="alreadyAudit" isForPrompting="false" class="java.lang.String"/>
	<parameter name="auditor" isForPrompting="false" class="java.lang.String"/>
	<parameter name="deDate" isForPrompting="false" class="java.lang.String"/>
	<parameter name="ECRPT_REPORTTITLE" isForPrompting="false" class="java.lang.String"/>
	<parameter name="ECRPT_REPORTSHORTNAME" isForPrompting="false" class="java.lang.String"/>
	<parameter name="fLFileName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="dJFileName" isForPrompting="false" class="java.lang.String"/>
	<parameter name="totalPrice" isForPrompting="false" class="java.lang.String"/>
	<parameter name="heTongDuan" isForPrompting="false" class="java.lang.String"/>
	<parameter name="gcszd" isForPrompting="false" class="java.lang.String"/>
	<parameter name="assessor" isForPrompting="false" class="java.lang.String"/>
	<parameter name="examinant" isForPrompting="false" class="java.lang.String"/>
	<parameter name="auditState" isForPrompting="false" class="java.lang.String"/>

	<field name="billName" class="java.lang.String"/>
	<field name="editorScope" class="java.lang.String"/>
	<field name="groupId" class="java.lang.String"/>
	<field name="no" class="java.lang.String"/>
	<field name="rcjName" class="java.lang.String"/>
	<field name="amounts" class="java.lang.Object"/>
	<field name="deAmounts" class="java.lang.Object"/>
	<field name="deNames" class="java.lang.Object"/>
	<field name="gcls" class="java.lang.Object"/>
	<field name="moneys" class="java.lang.Object"/>
	<field name="valueMaps" class="java.lang.Object"/>
	<field name="valueMap" class="java.lang.Object"/>
	<field name="pdeNames" class="java.lang.Object"/>
	<field name="units" class="java.lang.Object"/>
	<field name="nos" class="java.lang.Object"/>
	<field name="rcjUnit" class="java.lang.String"/>
	<field name="rcjPrice" class="java.lang.Double"/>
	<field name="lrlAndSJl" class="java.lang.Object"/>
	<field name="billNo" class="java.lang.String"/>
	<field name="unit" class="java.lang.String"/>
	<field name="gcl" class="java.lang.Double"/>
	<field name="unitPrice" class="java.lang.Double"/>
	<field name="rcjCode" class="java.lang.String"/>

	<variable name="heJiNo" class="java.lang.Integer" resetType="Group" resetGroup="deRcj" calculation="Sum">
		<variableExpression><![CDATA[($F{no}.equalsIgnoreCase( "1" )
&&"合  计".equalsIgnoreCase( ((String[])$F{pdeNames})[3] ))?
new Integer(1):new Integer(0)]]></variableExpression>
	</variable>

		<group  name="deRcj" isStartNewPage="true" isReprintHeaderOnEachPage="true" >
			<groupExpression><![CDATA[$F{groupId}]]></groupExpression>
			<groupHeader>
			<band height="109"  isSplitAllowed="false" >
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="490"
						y="0"
						width="134"
						height="21"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-5"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((String[])$F{pdeNames})[2]]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="222"
						y="0"
						width="134"
						height="21"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-5"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((String[])$F{pdeNames})[0]]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="356"
						y="0"
						width="134"
						height="21"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-5"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((String[])$F{pdeNames})[1]]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="0"
						width="134"
						height="21"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-5">
							<printWhenExpression><![CDATA[new Boolean(!"合  计".equalsIgnoreCase(((String[])$F{pdeNames})[3] ))]]></printWhenExpression>
						</reportElement>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((String[])$F{pdeNames})[3]]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="222"
						y="21"
						width="134"
						height="21"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-5"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((String[])$F{deNames})[0]]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="356"
						y="21"
						width="134"
						height="21"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-5"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((String[])$F{deNames})[1]]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="490"
						y="21"
						width="134"
						height="21"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-5"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((String[])$F{deNames})[2]]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="21"
						width="134"
						height="21"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-5">
							<printWhenExpression><![CDATA[new Boolean(!"合  计".equalsIgnoreCase(((String[])$F{pdeNames})[3] ))]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((String[])$F{deNames})[3]]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="222"
						y="42"
						width="134"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-5"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((String[])$F{units})[0]]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="356"
						y="42"
						width="134"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-5"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((String[])$F{units})[1]]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="490"
						y="42"
						width="134"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-5"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((String[])$F{units})[2]]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="42"
						width="134"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-5">
							<printWhenExpression><![CDATA[new Boolean(!"合  计".equalsIgnoreCase(((String[])$F{pdeNames})[3] ))]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((String[])$F{units})[3]]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="222"
						y="57"
						width="134"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-5"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((double[])$F{gcls})[0])]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="356"
						y="57"
						width="134"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-5"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((double[])$F{gcls})[1])]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="490"
						y="57"
						width="134"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-5"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((double[])$F{gcls})[2])]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="57"
						width="134"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-5">
							<printWhenExpression><![CDATA[new Boolean(!"合  计".equalsIgnoreCase(((String[])$F{pdeNames})[3] ))]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((double[])$F{gcls})[3])]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="222"
						y="72"
						width="134"
						height="21"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-5"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((String[])$F{nos})[0].replaceAll("-","～")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="356"
						y="72"
						width="134"
						height="21"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-5"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((String[])$F{nos})[1].replaceAll("-","～")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="490"
						y="72"
						width="134"
						height="21"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-5"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((String[])$F{nos})[2].replaceAll("-","～")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="72"
						width="134"
						height="21"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-5">
							<printWhenExpression><![CDATA[new Boolean(!"合  计".equalsIgnoreCase(((String[])$F{pdeNames})[3] ))]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((String[])$F{nos})[3].replaceAll("-","～")]]></textFieldExpression>
				</textField>
				<staticText>
					<reportElement
						mode="Transparent"
						x="52"
						y="93"
						width="102"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-2"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[工、料、机名称]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="154"
						y="93"
						width="25"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-3"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[单位]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="179"
						y="93"
						width="43"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-4"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[单价(元)]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="222"
						y="93"
						width="48"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-5"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[定额]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="270"
						y="93"
						width="44"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-6"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[数量]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="314"
						y="93"
						width="42"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-7"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[金额(元)]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="356"
						y="93"
						width="48"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-5"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[定额]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="404"
						y="93"
						width="44"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-6"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[数量]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="448"
						y="93"
						width="42"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-7"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[金额(元)]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="490"
						y="93"
						width="48"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-5"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[定额]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="538"
						y="93"
						width="44"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-6"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[数量]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="582"
						y="93"
						width="42"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-7"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[金额(元)]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="52"
						height="109"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-13"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[代



号]]></text>
				</staticText>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="52"
						y="0"
						width="170"
						height="21"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-14"/>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["工  程  项  目"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="52"
						y="21"
						width="170"
						height="21"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-15"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["工  程  细  目"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="52"
						y="42"
						width="170"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-16"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["定  额  单  位"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="52"
						y="57"
						width="170"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-17"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["工  程  数  量"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="52"
						y="72"
						width="170"
						height="21"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-18"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["定  额  表  号"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						x="624"
						y="93"
						width="48"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-107"
						isRemoveLineWhenBlank="true">
							<printWhenExpression><![CDATA[new Boolean(!"合  计".equalsIgnoreCase(((String[])$F{pdeNames})[3] ))]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["合  计".equalsIgnoreCase( ((String[])$F{pdeNames})[3] )?"":"定额"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						x="672"
						y="93"
						width="44"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-108"
						isRemoveLineWhenBlank="true">
							<printWhenExpression><![CDATA[new Boolean(!"合  计".equalsIgnoreCase(((String[])$F{pdeNames})[3] ))]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["合  计".equalsIgnoreCase(((String[])$F{pdeNames})[3]  )?"":"数量"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						x="716"
						y="93"
						width="42"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-109"
						isRemoveLineWhenBlank="true">
							<printWhenExpression><![CDATA[new Boolean(!"合  计".equalsIgnoreCase(((String[])$F{pdeNames})[3] ))]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["合  计".equalsIgnoreCase( ((String[])$F{pdeNames})[3] )?"":"金额(元)"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						x="624"
						y="93"
						width="67"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-110"
						isRemoveLineWhenBlank="true">
							<printWhenExpression><![CDATA[new Boolean(((String[])$F{pdeNames})[3].equalsIgnoreCase( "合  计" ))]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((String[])$F{pdeNames})[3].equalsIgnoreCase( "合  计" )?"数量":""]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						x="691"
						y="93"
						width="67"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-111"
						isRemoveLineWhenBlank="true">
							<printWhenExpression><![CDATA[new Boolean(((String[])$F{pdeNames})[3].equalsIgnoreCase( "合  计" ))]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[((String[])$F{pdeNames})[3].equalsIgnoreCase( "合  计" )?"金额(元)":""]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						x="624"
						y="0"
						width="134"
						height="93"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-128">
							<printWhenExpression><![CDATA[new Boolean(((String[])$F{pdeNames})[3].equalsIgnoreCase( "合  计" ))]]></printWhenExpression>
						</reportElement>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="12" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["合  计"]]></textFieldExpression>
				</textField>
			</band>
			</groupHeader>
			<groupFooter>
			<band height="120"  isSplitAllowed="false" >
				<textField isStretchWithOverflow="false" pattern="###0.00;(-###0.00)" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="60"
						width="67"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-120">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()!=0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="45"
						width="67"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-121">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()!=0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="691"
						y="60"
						width="67"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-122">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()!=0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map[])$F{valueMaps})[3].get("GFF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="691"
						y="45"
						width="67"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-123">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()!=0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map[])$F{valueMaps})[3].get("QGF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="716"
						y="30"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-188">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[3].get("DEZJ")-(Double)((Map[])$F{valueMaps})[3].get("DESW"))*((Double)((Map[])$F{valueMaps})[3].get("sp_fl_cs2")/100)]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="716"
						y="15"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-140">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[3].get("DRGF")+(Double)((Map[])$F{valueMaps})[3].get("DJXF"))*((Double)((Map[])$F{valueMaps})[3].get("sp_fl_cs1")/100)]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="691"
						y="30"
						width="67"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-189">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()!=0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[3].get("SFF"))]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="691"
						y="15"
						width="67"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-142">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()!=0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[3].get("CSF")-(Double)((Map[])$F{valueMaps})[3].get("SFF"))]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="691"
						y="90"
						width="67"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-126">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()!=0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[3].get("SJ")).doubleValue()]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="716"
						y="75"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-182">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[3].get("LR")).doubleValue()]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="716"
						y="0"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-154">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[3].get("ZJF"))]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="691"
						y="75"
						width="67"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-184">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()!=0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[3].get("LR")).doubleValue()]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="716"
						y="90"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-102">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[3].get("SJ")).doubleValue()]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="691"
						y="0"
						width="67"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-156">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()!=0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[3].get("ZJF"))]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00;(-###0.00)" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="90"
						width="67"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-124">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()!=0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00;(-###0.00)" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="75"
						width="67"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-183">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()!=0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00;(-###0.00)" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="15"
						width="67"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-141">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()!=0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<staticText>
					<reportElement
						mode="Transparent"
						x="0"
						y="60"
						width="52"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-23"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="0"
						y="45"
						width="52"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-24"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="52"
						y="45"
						width="102"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-25"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[企业管理费]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="52"
						y="60"
						width="102"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-26"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[规费]]></text>
				</staticText>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="222"
						y="60"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-46"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[0].get("GFF")/(Double)((Map[])$F{valueMaps})[0].get("sp_fl_gffl")*100]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="222"
						y="45"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-47"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[0].get("DEZJ")-(Double)((Map[])$F{valueMaps})[0].get("DESW")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="314"
						y="60"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-50"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map[])$F{valueMaps})[0].get("GFF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="314"
						y="45"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-51"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[0].get("DEZJ")-(Double)((Map[])$F{valueMaps})[0].get("DESW"))*(Double)((Map[])$F{valueMaps})[0].get("sp_fl_qgfl")/100]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="356"
						y="60"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-52"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[1].get("GFF")/(Double)((Map[])$F{valueMaps})[1].get("sp_fl_gffl")*100]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="356"
						y="45"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-53"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[1].get("DEZJ")-(Double)((Map[])$F{valueMaps})[1].get("DESW")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="448"
						y="60"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-56"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map[])$F{valueMaps})[1].get("GFF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="448"
						y="45"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-57"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[1].get("DEZJ")-(Double)((Map[])$F{valueMaps})[1].get("DESW"))*(Double)((Map[])$F{valueMaps})[1].get("sp_fl_qgfl")/100]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="490"
						y="60"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-58"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[2].get("GFF")/(Double)((Map[])$F{valueMaps})[2].get("sp_fl_gffl")*100]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="490"
						y="45"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-59"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[2].get("DEZJ")-(Double)((Map[])$F{valueMaps})[2].get("DESW")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="582"
						y="60"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-62"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map[])$F{valueMaps})[2].get("GFF")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="582"
						y="45"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-63"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[2].get("DEZJ")-(Double)((Map[])$F{valueMaps})[2].get("DESW"))*(Double)((Map[])$F{valueMaps})[2].get("sp_fl_qgfl")/100]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="60"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-64">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[3].get("GFF")/(Double)((Map[])$F{valueMaps})[3].get("sp_fl_gffl")*100]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="45"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-65">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[3].get("DEZJ")-(Double)((Map[])$F{valueMaps})[3].get("DESW")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="716"
						y="60"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-68">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Map[])$F{valueMaps})[3].get("GFF")]]></textFieldExpression>
				</textField>
				<staticText>
					<reportElement
						mode="Transparent"
						x="154"
						y="45"
						width="25"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-33"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[元]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="179"
						y="45"
						width="43"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-34"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="10" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="154"
						y="60"
						width="25"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-35"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[元]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="179"
						y="60"
						width="43"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-36"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="10" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="0"
						y="90"
						width="52"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-38"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="0"
						y="105"
						width="52"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-39"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="1Point" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="52"
						y="105"
						width="102"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-40"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="1Point" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[金额合计]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="52"
						y="90"
						width="102"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-41"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[税金]]></text>
				</staticText>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="222"
						y="105"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-81"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="1Point" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00;(-###0.00)" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="270"
						y="105"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-82"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="1Point" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="314"
						y="90"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-84"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[0].get("SJ")).doubleValue()]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="314"
						y="105"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-85"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="1Point" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((Double)((Map[])$F{valueMaps})[0].get("JAGCF")).doubleValue()+((Double)((Map[])$F{valueMaps})[0].get("CLASS_SLDJ")).doubleValue())]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="356"
						y="105"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-87"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="1Point" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00;(-###0.00)" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="404"
						y="105"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-89"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="1Point" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="448"
						y="90"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-90"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[1].get("SJ")).doubleValue()]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="448"
						y="105"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-91"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="1Point" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((Double)((Map[])$F{valueMaps})[1].get("JAGCF")).doubleValue()+((Double)((Map[])$F{valueMaps})[1].get("CLASS_SLDJ")).doubleValue())]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="490"
						y="105"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-93"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="1Point" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00;(-###0.00)" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="538"
						y="105"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-95"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="1Point" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="582"
						y="90"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-96"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[2].get("SJ")).doubleValue()]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="582"
						y="105"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-97"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="1Point" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((Double)((Map[])$F{valueMaps})[2].get("JAGCF")).doubleValue()+((Double)((Map[])$F{valueMaps})[2].get("CLASS_SLDJ")).doubleValue())]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="105"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-99">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="1Point" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00;(-###0.00)" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="672"
						y="105"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-101">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="1Point" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="716"
						y="105"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-103">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="2" bottomBorder="1Point" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((Double)((Map[])$F{valueMaps})[3].get("JAGCF")).doubleValue()+((Double)((Map[])$F{valueMaps})[3].get("CLASS_SLDJ")).doubleValue())]]></textFieldExpression>
				</textField>
				<staticText>
					<reportElement
						mode="Transparent"
						x="154"
						y="105"
						width="25"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-42"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="1Point" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[元]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="179"
						y="105"
						width="43"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-43"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="1Point" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="10" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="154"
						y="90"
						width="25"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-44"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[元]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="179"
						y="90"
						width="43"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-45"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="10" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[]]></text>
				</staticText>
				<textField isStretchWithOverflow="false" pattern="###0.00;(-###0.00)" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="105"
						width="67"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-125">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()!=0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="1Point" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="691"
						y="105"
						width="67"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-127">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()!=0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="2" bottomBorder="1Point" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((Double)((Map[])$F{valueMaps})[3].get("JAGCF")).doubleValue()+((Double)((Map[])$F{valueMaps})[3].get("CLASS_SLDJ")).doubleValue())]]></textFieldExpression>
				</textField>
				<staticText>
					<reportElement
						mode="Transparent"
						x="0"
						y="15"
						width="52"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-46"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="52"
						y="15"
						width="82"
						height="30"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-47"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[措施费]]></text>
				</staticText>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="270"
						y="15"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-129"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[0].get("sp_fl_cs1")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="314"
						y="15"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-131"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[0].get("DRGF")+(Double)((Map[])$F{valueMaps})[0].get("DJXF"))*((Double)((Map[])$F{valueMaps})[0].get("sp_fl_cs1")/100)]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="356"
						y="15"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-132"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[1].get("DRGF")+(Double)((Map[])$F{valueMaps})[1].get("DJXF"))]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="448"
						y="15"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-134"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[1].get("DRGF")+(Double)((Map[])$F{valueMaps})[1].get("DJXF"))*((Double)((Map[])$F{valueMaps})[1].get("sp_fl_cs1")/100)]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="490"
						y="15"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-135"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[2].get("DRGF")+(Double)((Map[])$F{valueMaps})[2].get("DJXF"))]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="582"
						y="15"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-137"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[2].get("DRGF")+(Double)((Map[])$F{valueMaps})[2].get("DJXF"))*((Double)((Map[])$F{valueMaps})[2].get("sp_fl_cs1")/100)]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="15"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-138">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[3].get("DRGF")+(Double)((Map[])$F{valueMaps})[3].get("DJXF"))]]></textFieldExpression>
				</textField>
				<staticText>
					<reportElement
						mode="Transparent"
						x="154"
						y="15"
						width="25"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-48"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[元]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="179"
						y="15"
						width="43"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-49"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="10" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[]]></text>
				</staticText>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="222"
						y="0"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-143"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00;(-###0.00)" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="270"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-144"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="314"
						y="0"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-145"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[0].get("ZJF"))]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="356"
						y="0"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-146"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00;(-###0.00)" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="404"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-147"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="448"
						y="0"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-148"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[1].get("ZJF"))]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="490"
						y="0"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-149"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00;(-###0.00)" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="538"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-150"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="582"
						y="0"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-151"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[2].get("ZJF"))]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="0"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-152">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00;(-###0.00)" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="672"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-153">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<staticText>
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="52"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-50"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="52"
						y="0"
						width="102"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-51"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[直接费]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="154"
						y="0"
						width="25"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-52"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[元]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="179"
						y="0"
						width="43"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-53"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="10" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[]]></text>
				</staticText>
				<textField isStretchWithOverflow="false" pattern="###0.00;(-###0.00)" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="0"
						width="67"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-155">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()!=0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<staticText>
					<reportElement
						mode="Transparent"
						x="0"
						y="30"
						width="52"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-54"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="134"
						y="30"
						width="20"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-55"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[Ⅱ]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="134"
						y="15"
						width="20"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-56"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[Ⅰ]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="154"
						y="30"
						width="25"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-57"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[元]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="0"
						y="75"
						width="52"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-59"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="52"
						y="75"
						width="102"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-60"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[利润]]></text>
				</staticText>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="222"
						y="75"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-171"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[0].get("LR")).doubleValue()/(Double)((Map[])$F{valueMaps})[0].get("sp_fl_lr")*100]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="314"
						y="75"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-173"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[0].get("LR")).doubleValue()]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="356"
						y="75"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-174"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[1].get("LR")).doubleValue()/(Double)((Map[])$F{valueMaps})[1].get("sp_fl_lr")*100]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="448"
						y="75"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-176"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[1].get("LR")).doubleValue()]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="490"
						y="75"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-177"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[2].get("LR")).doubleValue()/(Double)((Map[])$F{valueMaps})[2].get("sp_fl_lr")*100]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="582"
						y="75"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-179"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[2].get("LR")).doubleValue()]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="75"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-180">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[3].get("LR")).doubleValue()/(Double)((Map[])$F{valueMaps})[3].get("sp_fl_lr")*100]]></textFieldExpression>
				</textField>
				<staticText>
					<reportElement
						mode="Transparent"
						x="154"
						y="75"
						width="25"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-61"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[元]]></text>
				</staticText>
				<staticText>
					<reportElement
						mode="Transparent"
						x="179"
						y="75"
						width="43"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-62"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="10" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[]]></text>
				</staticText>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="222"
						y="15"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-185"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[0].get("DRGF")+(Double)((Map[])$F{valueMaps})[0].get("DJXF"))]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00;(-###0.00)" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="30"
						width="67"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-190">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()!=0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="270"
						y="30"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-191"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[0].get("sp_fl_cs2")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="314"
						y="30"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-192"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[0].get("DEZJ")-(Double)((Map[])$F{valueMaps})[0].get("DESW"))*((Double)((Map[])$F{valueMaps})[0].get("sp_fl_cs2")/100)]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="356"
						y="30"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-193"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[1].get("DRGF")+(Double)((Map[])$F{valueMaps})[1].get("DECLF")-(Double)((Map[])$F{valueMaps})[1].get("DESW")+(Double)((Map[])$F{valueMaps})[1].get("DJXF"))]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="448"
						y="30"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-194"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[1].get("DEZJ")-(Double)((Map[])$F{valueMaps})[1].get("DESW"))*((Double)((Map[])$F{valueMaps})[1].get("sp_fl_cs2")/100)]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="490"
						y="30"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-195"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[2].get("DRGF")+(Double)((Map[])$F{valueMaps})[2].get("DECLF")-(Double)((Map[])$F{valueMaps})[2].get("DESW")+(Double)((Map[])$F{valueMaps})[2].get("DJXF"))]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="582"
						y="30"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-196"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[2].get("DEZJ")-(Double)((Map[])$F{valueMaps})[2].get("DESW"))*((Double)((Map[])$F{valueMaps})[2].get("sp_fl_cs2")/100)]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="30"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-197">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[3].get("DRGF")+(Double)((Map[])$F{valueMaps})[3].get("DECLF")-(Double)((Map[])$F{valueMaps})[3].get("DESW")+(Double)((Map[])$F{valueMaps})[3].get("DJXF"))]]></textFieldExpression>
				</textField>
				<staticText>
					<reportElement
						mode="Transparent"
						x="179"
						y="30"
						width="43"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="staticText-63"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="10" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<text><![CDATA[]]></text>
				</staticText>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="222"
						y="30"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-199"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[0].get("DRGF")+(Double)((Map[])$F{valueMaps})[0].get("DECLF")-(Double)((Map[])$F{valueMaps})[0].get("DESW")+(Double)((Map[])$F{valueMaps})[0].get("DJXF"))]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="222"
						y="90"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-202"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[0].get("SJ")).doubleValue()/(Double)((Map[])$F{valueMaps})[0].get("sp_fl_sj")*100]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="356"
						y="90"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-203"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[1].get("SJ")).doubleValue()/(Double)((Map[])$F{valueMaps})[1].get("sp_fl_sj")*100]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="490"
						y="90"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-204"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[2].get("SJ")).doubleValue()/(Double)((Map[])$F{valueMaps})[2].get("sp_fl_sj")*100]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="90"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-205">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[3].get("SJ")).doubleValue()/(Double)((Map[])$F{valueMaps})[3].get("sp_fl_sj")*100]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="270"
						y="45"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-206"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[0].get("sp_fl_qgfl")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="716"
						y="45"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-209">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[((Double)((Map[])$F{valueMaps})[3].get("DEZJ")-(Double)((Map[])$F{valueMaps})[3].get("DESW"))*(Double)((Map[])$F{valueMaps})[3].get("sp_fl_qgfl")/100]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="270"
						y="60"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-210"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[0].get("sp_fl_gffl")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="270"
						y="75"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-214"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[0].get("sp_fl_lr")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="270"
						y="90"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-218"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[0].get("sp_fl_sj")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="302"
						y="15"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-227"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[0].get("sp_fl_cs1")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="302"
						y="30"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-228"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[0].get("sp_fl_cs2")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="302"
						y="45"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-229"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[0].get("sp_fl_qgfl")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="302"
						y="60"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-230"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[0].get("sp_fl_gffl")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="302"
						y="75"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-231"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[0].get("sp_fl_lr")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="302"
						y="90"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-232"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[0].get("sp_fl_sj")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="404"
						y="15"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-233"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[1].get("sp_fl_cs1")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="436"
						y="15"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-234"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[1].get("sp_fl_cs1")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="436"
						y="30"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-235"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[1].get("sp_fl_cs2")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="404"
						y="30"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-236"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[1].get("sp_fl_cs2")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="404"
						y="45"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-237"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[1].get("sp_fl_qgfl")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="436"
						y="45"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-238"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[1].get("sp_fl_qgfl")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="436"
						y="60"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-239"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[1].get("sp_fl_gffl")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="404"
						y="60"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-240"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[1].get("sp_fl_gffl")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="404"
						y="75"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-241"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[1].get("sp_fl_lr")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="436"
						y="75"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-242"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[1].get("sp_fl_lr")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="436"
						y="90"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-243"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[1].get("sp_fl_sj")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="404"
						y="90"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-244"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[1].get("sp_fl_sj")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="538"
						y="15"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-245"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[2].get("sp_fl_cs1")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="570"
						y="15"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-246"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[2].get("sp_fl_cs1")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="570"
						y="30"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-247"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[2].get("sp_fl_cs2")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="538"
						y="30"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-248"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[2].get("sp_fl_cs2")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="538"
						y="45"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-249"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[2].get("sp_fl_qgfl")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="570"
						y="45"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-250"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[2].get("sp_fl_qgfl")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="570"
						y="60"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-251"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[2].get("sp_fl_gffl")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="538"
						y="60"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-252"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[2].get("sp_fl_gffl")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="538"
						y="75"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-253"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[2].get("sp_fl_lr")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="570"
						y="75"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-254"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[2].get("sp_fl_lr")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="570"
						y="90"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-255"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[2].get("sp_fl_sj")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="538"
						y="90"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-256"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[2].get("sp_fl_sj")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="672"
						y="15"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-258">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[3].get("sp_fl_cs1")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="704"
						y="15"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-259">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[3].get("sp_fl_cs1")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="704"
						y="30"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-260">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[3].get("sp_fl_cs2")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="672"
						y="30"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-261">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[3].get("sp_fl_cs2")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="672"
						y="45"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-262">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[3].get("sp_fl_qgfl")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="704"
						y="45"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-263">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[3].get("sp_fl_qgfl")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="704"
						y="60"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-264">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[3].get("sp_fl_gffl")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="672"
						y="60"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-265">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[3].get("sp_fl_gffl")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="672"
						y="75"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-266">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[3].get("sp_fl_lr")]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="704"
						y="75"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-267">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[3].get("sp_fl_lr")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="704"
						y="90"
						width="12"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-268">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[(Double)((Map[])$F{valueMaps})[3].get("sp_fl_sj")==0?"":"%"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="672"
						y="90"
						width="32"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-269">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[(Double)((Map[])$F{valueMaps})[3].get("sp_fl_sj")]]></textFieldExpression>
				</textField>
			</band>
			</groupFooter>
		</group>
		<background>
			<band height="0"  isSplitAllowed="true" >
			</band>
		</background>
		<title>
			<band height="1"  isSplitAllowed="true" >
			</band>
		</title>
		<pageHeader>
			<band height="58"  isSplitAllowed="true" >
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="43"
						width="103"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-70"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["分项编号："+($F{billNo}==null ? "":$F{billNo})]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="28"
						width="538"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-71"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Bottom" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["编制范围："+$P{editScope}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="43"
						width="92"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-73"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["OP_PC"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="538"
						y="43"
						width="86"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-74"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["第 " + String.valueOf($V{PAGE_NUMBER}.intValue()+new Integer(0).intValue()) + " 页"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						x="538"
						y="28"
						width="220"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-104"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Bottom" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$P{deDate}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="716"
						y="43"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-105"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$P{ECRPT_REPORTSHORTNAME}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						x="0"
						y="0"
						width="758"
						height="28"
						key="textField-77"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Top">
						<font fontName="宋体" pdfFontName="STSong-Light" size="18" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$P{ECRPT_REPORTTITLE}+$P{alreadyAudit}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="103"
						y="43"
						width="199"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-222"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["工程名称："+($F{billName}==null?"":$F{billName})]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="302"
						y="43"
						width="74"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-223"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["单位："+($F{unit}==null ? "": $F{unit})]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="376"
						y="43"
						width="74"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-224"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["数量："+$F{gcl}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="450"
						y="43"
						width="40"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-225"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["单价："]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="490"
						y="43"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-226"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[$F{unitPrice}]]></textFieldExpression>
				</textField>
			</band>
		</pageHeader>
		<columnHeader>
			<band height="0"  isSplitAllowed="true" >
			</band>
		</columnHeader>
		<detail>
			<band height="15"  isSplitAllowed="false" >
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="52"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-7"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{rcjCode}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="52"
						y="0"
						width="102"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-8"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{rcjName}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="154"
						y="0"
						width="25"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-9"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{rcjUnit}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="179"
						y="0"
						width="43"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-10"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[$F{rcjPrice}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="222"
						y="0"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-11"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((double[])$F{deAmounts})[0])]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="270"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-11"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((double[])$F{amounts})[0])]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="314"
						y="0"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-11"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((double[])$F{moneys})[0])]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="356"
						y="0"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-11"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((double[])$F{deAmounts})[1])]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="404"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-11"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((double[])$F{amounts})[1])]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="448"
						y="0"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-11"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((double[])$F{moneys})[1])]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="490"
						y="0"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-11"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((double[])$F{deAmounts})[2])]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="538"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-11"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((double[])$F{amounts})[2])]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="582"
						y="0"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-11"
						stretchType="RelativeToTallestObject"/>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((double[])$F{moneys})[2])]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="0"
						width="48"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-11"
						stretchType="RelativeToTallestObject">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((double[])$F{deAmounts})[3])]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="672"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-11"
						stretchType="RelativeToTallestObject">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((double[])$F{amounts})[3])]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="716"
						y="0"
						width="42"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-11"
						stretchType="RelativeToTallestObject">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()==0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((double[])$F{moneys})[3])]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.000" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="624"
						y="0"
						width="67"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-112"
						stretchType="RelativeToTallestObject">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()!=0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((double[])$F{amounts})[3])]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="691"
						y="0"
						width="67"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-113"
						stretchType="RelativeToTallestObject">
							<printWhenExpression><![CDATA[new Boolean($V{heJiNo}.intValue()!=0)]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="Thin" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" rightPadding="2" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="Arial Narrow" pdfFontName="STSong-Light" size="8" isBold="false" isItalic="false" isUnderline="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H" isStrikeThrough="false" />
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[new Double(((double[])$F{moneys})[3])]]></textFieldExpression>
				</textField>
			</band>
		</detail>
		<columnFooter>
			<band height="0"  isSplitAllowed="true" >
			</band>
		</columnFooter>
		<pageFooter>
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
						key="textField-78">
							<printWhenExpression><![CDATA[!"青海".equalsIgnoreCase($P{gcszd}) || ("青海".equalsIgnoreCase($P{gcszd}) && !"编制".equalsIgnoreCase($P{auditState}))]]></printWhenExpression>
						</reportElement>
					<box topBorder="1Point" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="3" rightBorder="None" rightBorderColor="#000000" rightPadding="5" bottomBorder="None" bottomBorderColor="#000000"/>
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
						key="textField-79"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!"青海".equalsIgnoreCase($P{gcszd}) || ("青海".equalsIgnoreCase($P{gcszd}) && !"编制".equalsIgnoreCase($P{auditState}))]]></printWhenExpression>
						</reportElement>
					<box topBorder="1Point" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="3" rightBorder="None" rightBorderColor="#000000" rightPadding="5" bottomBorder="None" bottomBorderColor="#000000"/>
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
						key="textField-270"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA["青海".equalsIgnoreCase($P{gcszd}) && "编制".equalsIgnoreCase($P{auditState})]]></printWhenExpression>
						</reportElement>
					<box topBorder="1Point" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="3" rightBorder="None" rightBorderColor="#000000" rightPadding="5" bottomBorder="None" bottomBorderColor="#000000"/>
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
						key="textField-271">
							<printWhenExpression><![CDATA["青海".equalsIgnoreCase($P{gcszd}) && "编制".equalsIgnoreCase($P{auditState})]]></printWhenExpression>
						</reportElement>
					<box topBorder="1Point" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="3" rightBorder="None" rightBorderColor="#000000" rightPadding="5" bottomBorder="None" bottomBorderColor="#000000"/>
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
						key="textField-272">
							<printWhenExpression><![CDATA["青海".equalsIgnoreCase($P{gcszd}) && "编制".equalsIgnoreCase($P{auditState})]]></printWhenExpression>
						</reportElement>
					<box topBorder="1Point" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="3" rightBorder="None" rightBorderColor="#000000" rightPadding="5" bottomBorder="None" bottomBorderColor="#000000"/>
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
						key="textField-273">
							<printWhenExpression><![CDATA["青海".equalsIgnoreCase($P{gcszd}) && "编制".equalsIgnoreCase($P{auditState})]]></printWhenExpression>
						</reportElement>
					<box topBorder="1Point" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="3" rightBorder="None" rightBorderColor="#000000" rightPadding="5" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="false" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["审核："+$P{assessor}]]></textFieldExpression>
				</textField>
			</band>
		</pageFooter>
		<summary>
			<band height="0"  isSplitAllowed="true" >
			</band>
		</summary>
</jasperReport>
`