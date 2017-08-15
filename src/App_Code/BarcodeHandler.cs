using System;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Web;

namespace LoyaltyCard.App_Code
{
	// We need a handler to proxy images from the barcode service because
	// the barcode service doesn't have the right CORS headers to allow the
	// HTML page to add the image to a canvas and export it.
	public class BarcodeHandler : IHttpHandler
	{
		// JS expects a 300 DPI JPG.
		private const string UrlFormat = "https://barcode.tec-it.com/barcode.ashx?translate-esc=off&data={0}&code={1}&unit=Fit&dpi=300&imagetype=Jpg&rotation=0&color=000000&bgcolor=FFFFFF&qunit=Mm&quiet=0";

		public bool IsReusable
		{
			get
			{
				return true;
			}
		}

		public void ProcessRequest(HttpContext context)
		{
			if (context == null)
			{
				throw new ArgumentNullException("context");
			}

			var data = HttpUtility.UrlEncode(context.Request.QueryString["data"]);
			if(String.IsNullOrWhiteSpace(data))
			{
				throw new InvalidOperationException("You must specify data for the barcode.");
			}

			var type = HttpUtility.UrlEncode(context.Request.QueryString["type"]);
			if (String.IsNullOrWhiteSpace(type))
			{
				throw new InvalidOperationException("You must specify the barcode type.");
			}

			var url = String.Format(CultureInfo.InvariantCulture, UrlFormat, data, MapBarcodeType(type));
			var imageData = new WebClient().DownloadData(url);
			context.Response.ContentType = "image/jpg";
			context.Response.BinaryWrite(imageData);
		}

		private static string MapBarcodeType(string selectedType)
		{
			// Map the old Microscan barcode types to tec-it barcode types.
			switch(selectedType) {
				case "0":
					return "Code39";
				case "1":
					return "Code39FullASCII";
				case "2":
					return "Code25IL";
				case "3":
					return "Code11";
				case "5":
					return "MSI";
				case "6":
					return "UPCA";
				case "9":
					return "Code93";
				case "10":
					return "EAN13";
				case "11":
					return "EAN8";
				case "13":
					return "Code128";
				case "14":
					return "PlanetCode12";
				case "15":
					return "PostNet11";
				case "16":
					return "EANUCC128";
				case "17":
					return "PDF417";
				case "18":
					return "DataMatrix";
				case "19":
					return "MaxiCode";
				default:
					return "Code39";
			}
		}
	}
}