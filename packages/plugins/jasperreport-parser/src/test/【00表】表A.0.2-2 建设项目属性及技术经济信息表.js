export default `<?xml version="1.0" encoding="UTF-8"  ?>
<!-- Created with iReport - A designer for JasperReports -->
<!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN" "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd">
<jasperReport
		 name="建设项目技术经济信息表"
		 columnCount="1"
		 printOrder="Vertical"
		 orientation="Portrait"
		 pageWidth="586"
		 pageHeight="842"
		 columnWidth="502"
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

	<parameter name="editor" isForPrompting="false" class="java.lang.String"/>
	<parameter name="editScope" isForPrompting="false" class="java.lang.String"/>
	<parameter name="auditor" isForPrompting="false" class="java.lang.String"/>
	<parameter name="deDate" isForPrompting="false" class="java.lang.String"/>
	<parameter name="ECRPT_REPORTTITLE" isForPrompting="false" class="java.lang.String"/>
	<parameter name="ECRPT_REPORTSHORTNAME" isForPrompting="false" class="java.lang.String"/>
	<parameter name="projName1" isForPrompting="false" class="java.lang.String"/>
	<parameter name="projName2" isForPrompting="false" class="java.lang.String"/>
	<parameter name="gcszd" isForPrompting="false" class="java.lang.String"/>
	<parameter name="assessor" isForPrompting="false" class="java.lang.String"/>
	<parameter name="examinant" isForPrompting="false" class="java.lang.String"/>
	<parameter name="auditState" isForPrompting="false" class="java.lang.String"/>

	<field name="no" class="java.lang.String"/>
	<field name="name" class="java.lang.String"/>
	<field name="unit" class="java.lang.String"/>
	<field name="details" class="java.lang.String"/>
	<field name="value" class="java.lang.Double"/>
	<field name="mark" class="java.lang.String"/>
	<field name="zb" class="java.lang.Double"/>
	<field name="sum" class="java.lang.Double"/>
	<field name="rate" class="java.lang.Double"/>

		<background>
			<band height="0"  isSplitAllowed="true" >
			</band>
		</background>
		<title>
			<band height="0"  isSplitAllowed="true" >
			</band>
		</title>
		<pageHeader>
			<band height="43"  isSplitAllowed="true" >
				<textField isStretchWithOverflow="false" isBlankWhenNull="false" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						x="0"
						y="0"
						width="502"
						height="28"
						key="textField-40"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Top">
						<font fontName="宋体" pdfFontName="STSong-Light" size="18" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$P{ECRPT_REPORTTITLE}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="28"
						width="310"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-28"
						stretchType="RelativeToBandHeight"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["建设项目："+$P{editScope}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						x="310"
						y="28"
						width="130"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-43"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["编制日期："+$P{deDate}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						x="440"
						y="28"
						width="62"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-84"/>
					<box topBorder="None" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="None" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$P{ECRPT_REPORTSHORTNAME}]]></textFieldExpression>
				</textField>
			</band>
		</pageHeader>
		<columnHeader>
			<band height="0"  isSplitAllowed="true" >
			</band>
		</columnHeader>
		<detail>
			<band height="15"  isSplitAllowed="true" >
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-85">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==1]]></printWhenExpression>
						</reportElement>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["一"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="44"
						y="0"
						width="458"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-86">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==1]]></printWhenExpression>
						</reportElement>
					<box topBorder="1Point" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["  项目基本属性"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-87">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==2]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["编号"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="44"
						y="0"
						width="126"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-88">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==2]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["名称"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="402"
						y="0"
						width="100"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-89">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==2]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["备注"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="230"
						y="0"
						width="172"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-90">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==2]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["信息"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="170"
						y="0"
						width="60"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-91">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==2]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["单位"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="44"
						y="0"
						width="126"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-92"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>2&&$V{REPORT_COUNT}<17]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{name}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="170"
						y="0"
						width="60"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-93"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>2&&$V{REPORT_COUNT}<17]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{unit}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="230"
						y="0"
						width="172"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-94"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>2&&$V{REPORT_COUNT}<17]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{details}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="402"
						y="0"
						width="100"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-96"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>2&&$V{REPORT_COUNT}<17]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="1Point" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{mark}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-97"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>2&&$V{REPORT_COUNT}<17]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="1Point" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{no}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-98">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==17]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["二"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="44"
						y="0"
						width="458"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-99">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==17]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["  项目工程数量信息"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-100">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==18]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["编号"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="44"
						y="0"
						width="126"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-101">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==18]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["内容"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="402"
						y="0"
						width="100"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-102">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==18]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["备注"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="230"
						y="0"
						width="83"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-103">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==18]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["数量"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="170"
						y="0"
						width="60"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-104">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==18]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["单位"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="44"
						y="0"
						width="126"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-105"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>18&&$V{REPORT_COUNT}<43]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{name}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="170"
						y="0"
						width="60"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-106"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>18&&$V{REPORT_COUNT}<43]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{unit}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="230"
						y="0"
						width="83"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-107"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>18&&$V{REPORT_COUNT}<43]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[$F{value}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="402"
						y="0"
						width="100"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-108"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>18&&$V{REPORT_COUNT}<43]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="1Point" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{mark}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-109"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>18&&$V{REPORT_COUNT}<43]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="1Point" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{no}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="313"
						y="0"
						width="89"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-110">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==18]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["数量指标"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="313"
						y="0"
						width="89"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-111"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>18&&$V{REPORT_COUNT}<43]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[$F{zb}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-112">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==43]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["三"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="44"
						y="0"
						width="458"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-113">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==43]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["  项目造价指标信息表"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-114">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==44]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["编号"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="44"
						y="0"
						width="126"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-115">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==44]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["工程造价"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="402"
						y="0"
						width="100"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-116">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==44]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["备注"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="230"
						y="0"
						width="83"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-117">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==44]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["造价指标(万元/km)"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="170"
						y="0"
						width="60"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-118">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==44]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["总金额(万元)"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="44"
						y="0"
						width="126"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-119"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>44&&$V{REPORT_COUNT}<61]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{name}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="170"
						y="0"
						width="60"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-120"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>44&&$V{REPORT_COUNT}<61]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[$F{sum}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="230"
						y="0"
						width="83"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-121"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>44&&$V{REPORT_COUNT}<61]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[$F{zb}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="402"
						y="0"
						width="100"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-122"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>44&&$V{REPORT_COUNT}<61]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="1Point" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{mark}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-123"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>44&&$V{REPORT_COUNT}<61]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="1Point" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{no}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="313"
						y="0"
						width="89"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-124">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==44]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["占总造价百分比(%)"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="313"
						y="0"
						width="89"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-125"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>44&&$V{REPORT_COUNT}<61]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[$F{rate}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-126">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==61]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["四"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="44"
						y="0"
						width="458"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-127">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==61]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["  分项造价指标信息表"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-128">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==62]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["编号"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="44"
						y="0"
						width="126"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-129">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==62]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["名称"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="309"
						y="0"
						width="193"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-130">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==62]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["备注"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="230"
						y="0"
						width="79"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-131">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==62]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["造价指标(元)"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="170"
						y="0"
						width="60"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-132">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==62]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["单位"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="44"
						y="0"
						width="126"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-133"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>62&&$V{REPORT_COUNT}<94]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{name}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="170"
						y="0"
						width="60"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-134"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>62&&$V{REPORT_COUNT}<94]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{unit}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="230"
						y="0"
						width="79"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-135"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>62&&$V{REPORT_COUNT}<94]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[$F{zb}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="309"
						y="0"
						width="193"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-136"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>62&&$V{REPORT_COUNT}<94]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="1Point" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{mark}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-137"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>62&&$V{REPORT_COUNT}<94]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="1Point" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{no}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-138">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==94]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["五"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="44"
						y="0"
						width="458"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-139">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==94]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isBold="true" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["  主要材料单价信息表"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-140">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==95]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="1Point" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["编号"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="44"
						y="0"
						width="126"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-141">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==95]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["名称"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="309"
						y="0"
						width="193"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-142">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==95]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="1Point" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["备注"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="230"
						y="0"
						width="79"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-143">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==95]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["单价(元)"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="170"
						y="0"
						width="60"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-144">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}==95]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" leftBorder="None" leftBorderColor="#000000" rightBorder="Thin" rightBorderColor="#000000" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["单位"]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="44"
						y="0"
						width="126"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-145"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>95]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Left" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{name}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="170"
						y="0"
						width="60"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-146"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>95]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{unit}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0.00" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="230"
						y="0"
						width="79"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-147"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>95]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Right" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.Double"><![CDATA[$F{value}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="309"
						y="0"
						width="193"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-148"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>95]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="None" leftBorderColor="#000000" leftPadding="1" rightBorder="1Point" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{mark}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="###0" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="0"
						width="44"
						height="15"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-149"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[$V{REPORT_COUNT}>95]]></printWhenExpression>
						</reportElement>
					<box topBorder="Thin" topBorderColor="#000000" topPadding="1" leftBorder="1Point" leftBorderColor="#000000" leftPadding="1" rightBorder="Thin" rightBorderColor="#000000" rightPadding="1" bottomBorder="None" bottomBorderColor="#000000" bottomPadding="1"/>
					<textElement textAlignment="Center" verticalAlignment="Middle" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA[$F{no}]]></textFieldExpression>
				</textField>
			</band>
		</detail>
		<columnFooter>
			<band height="17"  isSplitAllowed="true" >
				<line direction="TopDown">
					<reportElement
						x="0"
						y="0"
						width="502"
						height="2"
						key="line-1"/>
					<graphicElement stretchType="NoStretch"/>
				</line>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="1"
						width="270"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-150"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA[!"青海".equalsIgnoreCase($P{gcszd}) || ("青海".equalsIgnoreCase($P{gcszd}) && !"编制".equalsIgnoreCase($P{auditState}))]]></printWhenExpression>
						</reportElement>
					<box topBorder="None" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="8" rightBorder="None" rightBorderColor="#000000" rightPadding="16" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["编制："+$P{editor}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="270"
						y="1"
						width="232"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-151">
							<printWhenExpression><![CDATA[!"青海".equalsIgnoreCase($P{gcszd}) || ("青海".equalsIgnoreCase($P{gcszd}) && !"编制".equalsIgnoreCase($P{auditState}))]]></printWhenExpression>
						</reportElement>
					<box topBorder="None" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="8" rightBorder="None" rightBorderColor="#000000" rightPadding="16" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["复核："+$P{auditor}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="true" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="0"
						y="1"
						width="125"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-152"
						stretchType="RelativeToBandHeight">
							<printWhenExpression><![CDATA["青海".equalsIgnoreCase($P{gcszd}) && "编制".equalsIgnoreCase($P{auditState})]]></printWhenExpression>
						</reportElement>
					<box topBorder="None" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="8" rightBorder="None" rightBorderColor="#000000" rightPadding="16" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["编制："+$P{editor}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="125"
						y="1"
						width="125"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-153">
							<printWhenExpression><![CDATA["青海".equalsIgnoreCase($P{gcszd}) && "编制".equalsIgnoreCase($P{auditState})]]></printWhenExpression>
						</reportElement>
					<box topBorder="None" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="8" rightBorder="None" rightBorderColor="#000000" rightPadding="16" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["复核："+$P{auditor}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="250"
						y="1"
						width="126"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-154">
							<printWhenExpression><![CDATA["青海".equalsIgnoreCase($P{gcszd}) && "编制".equalsIgnoreCase($P{auditState})]]></printWhenExpression>
						</reportElement>
					<box topBorder="None" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="8" rightBorder="None" rightBorderColor="#000000" rightPadding="16" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["审查："+$P{examinant}]]></textFieldExpression>
				</textField>
				<textField isStretchWithOverflow="false" pattern="" isBlankWhenNull="true" evaluationTime="Now" hyperlinkType="None"  hyperlinkTarget="Self" >
					<reportElement
						mode="Transparent"
						x="376"
						y="1"
						width="126"
						height="16"
						forecolor="#000000"
						backcolor="#FFFFFF"
						key="textField-155">
							<printWhenExpression><![CDATA["青海".equalsIgnoreCase($P{gcszd}) && "编制".equalsIgnoreCase($P{auditState})]]></printWhenExpression>
						</reportElement>
					<box topBorder="None" topBorderColor="#000000" topPadding="3" leftBorder="None" leftBorderColor="#000000" leftPadding="8" rightBorder="None" rightBorderColor="#000000" rightPadding="16" bottomBorder="None" bottomBorderColor="#000000"/>
					<textElement textAlignment="Left" verticalAlignment="Top" rotation="None" lineSpacing="Single">
						<font fontName="宋体" pdfFontName="STSong-Light" size="8" isPdfEmbedded ="true" pdfEncoding ="UniGB-UCS2-H"/>
					</textElement>
				<textFieldExpression   class="java.lang.String"><![CDATA["审核："+$P{assessor}]]></textFieldExpression>
				</textField>
			</band>
		</columnFooter>
		<pageFooter>
			<band height="0"  isSplitAllowed="true" >
			</band>
		</pageFooter>
		<summary>
			<band height="0"  isSplitAllowed="true" >
			</band>
		</summary>
</jasperReport>
`;